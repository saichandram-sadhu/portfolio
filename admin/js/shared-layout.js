/**
 * Shared Layout HTML for Admin Pages
 * This function returns the common sidebar and header HTML
 */

function getSharedLayout(currentPage = 'dashboard') {
    const pages = {
        dashboard: { icon: 'chart-line', name: 'Dashboard', url: 'dashboard.html' },
        blog: { icon: 'blog', name: 'Blog Posts', url: 'blog.html' },
        projects: { icon: 'project-diagram', name: 'Projects', url: 'projects.html' },
        testimonials: { icon: 'quote-left', name: 'Testimonials', url: 'testimonials.html' },
        skills: { icon: 'code', name: 'Skills', url: 'skills.html' },
        messages: { icon: 'envelope', name: 'Messages', url: 'messages.html' },
        profile: { icon: 'user', name: 'Profile', url: 'profile.html' },
        settings: { icon: 'cog', name: 'SEO Settings', url: 'settings.html' }
    };

    const sidebar = Object.entries(pages).map(([key, page]) => {
        const isActive = key === currentPage;
        return `
            <a href="${page.url}" class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 ${
                isActive ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            } rounded-lg transition">
                <i class="fas fa-${page.icon} w-5 mr-3"></i>
                ${page.name}
            </a>
        `;
    }).join('');

    return {
        sidebar,
        pageTitle: pages[currentPage]?.name || 'Admin Panel'
    };
}
