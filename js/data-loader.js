/**
 * Data Loader for Portfolio
 * Loads all portfolio data from JSON files dynamically
 */

class PortfolioDataLoader {
    constructor() {
        this.data = {
            blog: null,
            projects: null,
            testimonials: null,
            skills: null,
            profile: null,
            seo: null
        };
    }

    /**
     * Load all data files
     */
    async loadAll() {
        try {
            const [blog, projects, testimonials, skills, profile, seo] = await Promise.all([
                this.loadJSON('/data/blog.json'),
                this.loadJSON('/data/projects.json'),
                this.loadJSON('/data/testimonials.json'),
                this.loadJSON('/data/skills.json'),
                this.loadJSON('/data/profile.json'),
                this.loadJSON('/data/seo.json')
            ]);

            this.data = {
                blog: blog || [],
                projects: projects || [],
                testimonials: testimonials || [],
                skills: skills || [],
                profile: profile || null,
                seo: seo || null
            };

            return this.data;
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            return this.data;
        }
    }

    /**
     * Load a single JSON file
     */
    async loadJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return null;
        }
    }

    /**
     * Render blog posts
     */
    renderBlogPosts(containerSelector = '.blog-grid') {
        const container = document.querySelector(containerSelector);
        if (!container || !this.data.blog) return;

        container.innerHTML = this.data.blog.map(post => `
            <article class="blog-card fade-in" data-category="${post.category || 'all'}">
                <div class="blog-image">
                    <div class="blog-placeholder">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="blog-category">${(post.category || '').toUpperCase()}</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="fas fa-calendar"></i> ${this.formatDate(post.date)}</span>
                        <span class="blog-read-time"><i class="fas fa-clock"></i> ${post.readTime || 5} min read</span>
                    </div>
                    <h3 class="blog-title">${post.title || 'Untitled'}</h3>
                    <p class="blog-excerpt">${post.excerpt || ''}</p>
                    <a href="#blog" class="blog-link" data-slug="${post.slug || ''}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
    }

    /**
     * Render projects
     */
    renderProjects(containerSelector = '.projects-grid') {
        const container = document.querySelector(containerSelector);
        if (!container || !this.data.projects) return;

        container.innerHTML = this.data.projects.map(project => `
            <div class="project-card fade-in">
                <div class="project-image">
                    ${project.image ? 
                        `<img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
                        ''
                    }
                    <div class="project-placeholder" style="display: ${project.image ? 'none' : 'flex'}"><i class="fas fa-project-diagram"></i></div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title || 'Untitled'}</h3>
                    <p class="project-description">${project.description || ''}</p>
                    <div class="project-tags">
                        ${(project.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render testimonials
     */
    renderTestimonials(containerSelector = '.testimonials-slider') {
        const container = document.querySelector(containerSelector);
        if (!container || !this.data.testimonials) return;

        container.innerHTML = this.data.testimonials.map((testimonial, index) => `
            <div class="testimonial-card fade-in ${index === 0 ? 'active' : ''}">
                <div class="testimonial-content">
                    <div class="testimonial-quote">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <p class="testimonial-text">"${testimonial.text || ''}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            ${testimonial.photo ? 
                                `<img src="${testimonial.photo}" alt="${testimonial.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` :
                                ''
                            }
                            <div style="display: ${testimonial.photo ? 'none' : 'flex'}"><i class="fas fa-user"></i></div>
                        </div>
                        <div class="author-info">
                            <h4 class="author-name">${testimonial.name || ''}</h4>
                            <p class="author-role">${testimonial.role || ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Update testimonial dots
        const dotsContainer = document.querySelector('.testimonial-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = this.data.testimonials.map((_, index) => `
                <span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
            `).join('');
        }
    }

    /**
     * Render skills
     */
    renderSkills(containerSelector = '.skills-container') {
        const container = document.querySelector(containerSelector);
        if (!container || !this.data.skills) return;

        container.innerHTML = this.data.skills.map(skill => `
            <div class="skill fade-in">
                <div class="skill-name">
                    <span>${skill.name || ''}</span>
                    <span class="skill-percent">${skill.percent || 0}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.percent || 0}%"></div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Update profile information
     */
    updateProfile() {
        if (!this.data.profile) return;

        const profile = this.data.profile;
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = profile.name || heroTitle.textContent;
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = profile.title || heroSubtitle.textContent;

        // Update about section
        const aboutDescription = document.querySelector('.about-description');
        if (aboutDescription) aboutDescription.textContent = profile.about || aboutDescription.textContent;

        // Update contact info
        const contactPhone = document.querySelector('.contact-detail:has(.fa-phone) span');
        if (contactPhone) contactPhone.textContent = profile.phone || contactPhone.textContent;

        const contactEmail = document.querySelector('.contact-detail:has(.fa-envelope) span');
        if (contactEmail) contactEmail.textContent = profile.email || contactEmail.textContent;

        const contactLocation = document.querySelector('.contact-detail:has(.fa-map-marker-alt) span');
        if (contactLocation) contactLocation.textContent = profile.location || contactLocation.textContent;
    }

    /**
     * Update SEO meta tags
     */
    updateSEO() {
        if (!this.data.seo) return;

        const seo = this.data.seo;

        // Update title
        if (seo.title) {
            document.title = seo.title;
            const metaTitle = document.querySelector('meta[name="title"]');
            if (metaTitle) metaTitle.setAttribute('content', seo.title);
        }

        // Update description
        if (seo.description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', seo.description);
        }

        // Update keywords
        if (seo.keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) metaKeywords.setAttribute('content', seo.keywords);
        }

        // Update OG tags
        if (seo.ogTitle) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle);
        }

        if (seo.ogDescription) {
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', seo.ogDescription);
        }

        if (seo.ogImage) {
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) ogImage.setAttribute('content', seo.ogImage);
        }

        // Update canonical URL
        if (seo.canonicalUrl) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', seo.canonicalUrl);
        }
    }

    /**
     * Format date
     */
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Initialize and render all data
     */
    async init() {
        await this.loadAll();
        this.renderBlogPosts();
        this.renderProjects();
        this.renderTestimonials();
        this.renderSkills();
        this.updateProfile();
        this.updateSEO();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioDataLoader = new PortfolioDataLoader();
    window.portfolioDataLoader.init();
});
