// ============================================
// ERROR HANDLING
// ============================================

console.log('✅ blog-newsletter.js loaded successfully');

// ============================================
// BLOG FILTERING FUNCTIONALITY
// ============================================

function initBlogFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length === 0 || blogCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter blog cards with animation
            blogCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// NEWSLETTER SIGNUP
// ============================================

const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

function showNewsletterMessage(message, type) {
    if (!newsletterMessage) return;
    
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    newsletterMessage.style.display = 'block';
    
    setTimeout(() => {
        newsletterMessage.style.display = 'none';
    }, 5000);
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validate email
        if (!emailRegex.test(email)) {
            showNewsletterMessage('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        
        try {
            // Integration options:
            // 1. EmailJS - Send to your email
            // 2. Mailchimp API
            // 3. ConvertKit API
            // 4. Custom backend endpoint
            
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNewsletterMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
            newsletterForm.reset();
            
            // Track newsletter signup in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': 'Newsletter Subscription'
                });
            }
        } catch (error) {
            console.error('Newsletter signup error:', error);
            showNewsletterMessage('Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// ============================================
// SOCIAL SHARING - COPY LINK
// ============================================

const copyLinkBtn = document.getElementById('copyLinkBtn');

if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
        const url = window.location.href;
        
        try {
            // Modern clipboard API
            await navigator.clipboard.writeText(url);
            
            // Show success feedback
            const originalHTML = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
            copyLinkBtn.style.background = '#4caf50';
            copyLinkBtn.style.color = 'white';
            copyLinkBtn.style.borderColor = '#4caf50';
            
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalHTML;
                copyLinkBtn.style.background = '';
                copyLinkBtn.style.color = '';
                copyLinkBtn.style.borderColor = '';
            }, 2000);
            
            // Track share event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'share', {
                    'method': 'copy_link',
                    'content_type': 'portfolio'
                });
            }
        } catch (error) {
            console.error('Failed to copy link:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
            setTimeout(() => {
                copyLinkBtn.innerHTML = '<i class="fas fa-link"></i> <span>Copy Link</span>';
            }, 2000);
        }
    });
}

// Track social share clicks
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.classList.contains('share-twitter') ? 'twitter' :
                        btn.classList.contains('share-linkedin') ? 'linkedin' :
                        btn.classList.contains('share-facebook') ? 'facebook' : 'other';
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                'method': platform,
                'content_type': 'portfolio'
            });
        }
    });
});

// Initialize blog filtering on page load
document.addEventListener('DOMContentLoaded', () => {
    initBlogFiltering();
});

