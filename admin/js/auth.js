/**
 * Authentication Service
 * Handles login, logout, and session management
 */

class AuthService {
    constructor() {
        this.sessionKey = 'admin_session';
        this.tokenKey = 'github_token';
        this.configKey = 'github_config';
    }

    /**
     * Hash password using Web Crypto API
     */
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Verify password against stored hash
     */
    async verifyPassword(password, storedHash) {
        const hash = await this.hashPassword(password);
        return hash === storedHash;
    }

    /**
     * Load auth data from JSON file
     */
    async loadAuthData() {
        try {
            // Try to load from GitHub API if token is available
            const token = this.getToken();
            if (token) {
                const githubAPI = window.GitHubAPI;
                const config = this.getConfig();
                if (config && githubAPI) {
                    githubAPI.init(config.owner, config.repo, token);
                    const authData = await githubAPI.readFile('data/auth.json');
                    if (authData) {
                        return authData;
                    }
                }
            }

            // Fallback: try to load from local fetch (for initial setup)
            const response = await fetch('/data/auth.json');
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error loading auth data:', error);
            return null;
        }
    }

    /**
     * Login with password
     */
    async login(password) {
        try {
            const authData = await this.loadAuthData();
            if (!authData) {
                throw new Error('Auth data not found');
            }

            // For initial setup, if passwordHash is placeholder, set it
            if (authData.passwordHash === '$2a$10$placeholder_hash_replace_with_actual_hash') {
                // First time setup - hash the password and save it
                const hash = await this.hashPassword(password);
                authData.passwordHash = hash;
                authData.lastLogin = new Date().toISOString();
                
                // Save the updated auth data
                const token = this.getToken();
                const config = this.getConfig();
                if (token && config) {
                    const githubAPI = window.GitHubAPI;
                    githubAPI.init(config.owner, config.repo, token);
                    await githubAPI.saveFile('data/auth.json', authData, 'Initial password setup');
                }
            }

            // Verify password
            const isValid = await this.verifyPassword(password, authData.passwordHash);
            
            if (isValid) {
                // Create session
                const session = {
                    token: this.generateSessionToken(),
                    expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
                };
                localStorage.setItem(this.sessionKey, JSON.stringify(session));
                
                // Update last login
                authData.lastLogin = new Date().toISOString();
                const token = this.getToken();
                const config = this.getConfig();
                if (token && config) {
                    const githubAPI = window.GitHubAPI;
                    githubAPI.init(config.owner, config.repo, token);
                    await githubAPI.saveFile('data/auth.json', authData, 'Update last login');
                }
                
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Generate session token
     */
    generateSessionToken() {
        return Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        const session = localStorage.getItem(this.sessionKey);
        if (!session) {
            return false;
        }

        try {
            const sessionData = JSON.parse(session);
            if (Date.now() > sessionData.expires) {
                localStorage.removeItem(this.sessionKey);
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Logout
     */
    logout() {
        localStorage.removeItem(this.sessionKey);
        window.location.href = '/admin/login.html';
    }

    /**
     * Require authentication (redirect if not authenticated)
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/admin/login.html';
            return false;
        }
        return true;
    }

    /**
     * Save GitHub token
     */
    saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * Get GitHub token
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Save GitHub config (owner, repo)
     */
    saveConfig(owner, repo) {
        localStorage.setItem(this.configKey, JSON.stringify({ owner, repo }));
    }

    /**
     * Get GitHub config
     */
    getConfig() {
        const config = localStorage.getItem(this.configKey);
        return config ? JSON.parse(config) : null;
    }

    /**
     * Change password
     */
    async changePassword(oldPassword, newPassword) {
        try {
            // Verify old password
            const isValid = await this.login(oldPassword);
            if (!isValid) {
                throw new Error('Current password is incorrect');
            }

            // Hash new password
            const newHash = await this.hashPassword(newPassword);
            
            // Update auth data
            const authData = await this.loadAuthData();
            authData.passwordHash = newHash;
            
            // Save to GitHub
            const token = this.getToken();
            const config = this.getConfig();
            if (token && config) {
                const githubAPI = window.GitHubAPI;
                githubAPI.init(config.owner, config.repo, token);
                await githubAPI.saveFile('data/auth.json', authData, 'Change password');
            }

            return true;
        } catch (error) {
            console.error('Change password error:', error);
            throw error;
        }
    }
}

// Export singleton instance
window.AuthService = new AuthService();
