/**
 * Admin Layout Component
 * Shared layout functionality for all admin pages
 */

function initAdminLayout() {
    // Check authentication
    if (!window.AuthService.isAuthenticated()) {
        window.location.href = '/admin/login.html';
        return;
    }

    // Initialize GitHub API
    const config = window.AuthService.getConfig();
    const token = window.AuthService.getToken();
    if (config && token) {
        window.GitHubAPI.init(config.owner, config.repo, token);
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('admin_theme') || 'light';
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('admin_theme', isDark ? 'dark' : 'light');
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                window.AuthService.logout();
            }
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminLayout);
} else {
    initAdminLayout();
}
