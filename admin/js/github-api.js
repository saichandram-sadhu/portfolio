/**
 * GitHub API Service
 * Handles all GitHub API operations for saving JSON files
 */

class GitHubAPI {
    constructor() {
        this.repoOwner = ''; // Will be set from config
        this.repoName = ''; // Will be set from config
        this.token = ''; // Will be set from localStorage
        this.baseURL = 'https://api.github.com';
    }

    /**
     * Initialize with repository info and token
     */
    init(repoOwner, repoName, token) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
        this.token = token;
    }

    /**
     * Get file SHA (required for updating files)
     */
    async getFileSHA(filePath) {
        try {
            const response = await fetch(
                `${this.baseURL}/repos/${this.repoOwner}/${this.repoName}/contents/${filePath}`,
                {
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.status === 404) {
                return null; // File doesn't exist yet
            }

            if (!response.ok) {
                throw new Error(`Failed to get file SHA: ${response.statusText}`);
            }

            const data = await response.json();
            return data.sha;
        } catch (error) {
            console.error('Error getting file SHA:', error);
            throw error;
        }
    }

    /**
     * Save or update a JSON file
     */
    async saveFile(filePath, content, message = 'Update data') {
        try {
            // Get existing file SHA if it exists
            const sha = await this.getFileSHA(filePath);

            // Convert content to base64
            const contentBase64 = btoa(JSON.stringify(content, null, 2));

            const body = {
                message: message,
                content: contentBase64,
                ...(sha && { sha: sha }) // Include SHA if file exists
            };

            const response = await fetch(
                `${this.baseURL}/repos/${this.repoOwner}/${this.repoName}/contents/${filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `Failed to save file: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error saving file:', error);
            throw error;
        }
    }

    /**
     * Read a JSON file from the repository
     */
    async readFile(filePath) {
        try {
            const response = await fetch(
                `${this.baseURL}/repos/${this.repoOwner}/${this.repoName}/contents/${filePath}`,
                {
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.status === 404) {
                return null;
            }

            if (!response.ok) {
                throw new Error(`Failed to read file: ${response.statusText}`);
            }

            const data = await response.json();
            const content = atob(data.content.replace(/\s/g, ''));
            return JSON.parse(content);
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

    /**
     * Delete a file
     */
    async deleteFile(filePath, message = 'Delete file') {
        try {
            const sha = await this.getFileSHA(filePath);
            if (!sha) {
                throw new Error('File not found');
            }

            const response = await fetch(
                `${this.baseURL}/repos/${this.repoOwner}/${this.repoName}/contents/${filePath}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        sha: sha
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `Failed to delete file: ${response.statusText}`);
            }

            return true;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }
}

// Export singleton instance
window.GitHubAPI = new GitHubAPI();
