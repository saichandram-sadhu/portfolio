/**
 * Admin Layout Component
 * Shared layout functionality for all admin pages
 */

function initAdminLayout() {
    // Check authentication
    if (!window.AuthService || !window.AuthService.isAuthenticated()) {
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return;
    }

    // Initialize GitHub API
    const config = window.AuthService.getConfig();
    const token = window.AuthService.getToken();
    if (config && token && window.GitHubAPI) {
        window.GitHubAPI.init(config.owner, config.repo, token);
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

// Navigation initialization
function initNavigation() {
    initAdminLayout();
    
    // Set active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Helper function for loading JSON
async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Failed to load');
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${path}:`, error);
        return null;
    }
}

// Expose functions
window.initNavigation = initNavigation;
window.loadJSON = loadJSON;

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminLayout);
} else {
    initAdminLayout();
}
