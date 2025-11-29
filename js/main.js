// ============================================
// DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update aria-pressed for accessibility
    themeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ============================================
// PAGE FADE-IN ON LOAD
// ============================================

// Body fade-in is now handled by CSS animation after loader completes
// This ensures smooth transition from loading screen to content

// ============================================
// PARALLAX EFFECT FOR AVATAR
// ============================================

const avatarCard = document.querySelector('.avatar-card');
const glassLayer1 = document.querySelector('.layer-1');
const glassLayer2 = document.querySelector('.layer-2');
const heroSection = document.getElementById('hero');

let mouseX = 0;
let mouseY = 0;
let cardX = 0;
let cardY = 0;
let layer1X = 0;
let layer1Y = 0;
let layer2X = 0;
let layer2Y = 0;

// Smooth parallax with easing
function updateParallax() {
    const speed = 0.05;
    const layer1Speed = 0.03;
    const layer2Speed = 0.04;
    
    cardX += (mouseX - cardX) * speed;
    cardY += (mouseY - cardY) * speed;
    layer1X += (mouseX - layer1X) * layer1Speed;
    layer1Y += (mouseY - layer1Y) * layer1Speed;
    layer2X += (mouseX - layer2X) * layer2Speed;
    layer2Y += (mouseY - layer2Y) * layer2Speed;
    
    if (avatarCard) {
        avatarCard.style.transform = `translate(${cardX * 0.1}px, ${cardY * 0.1}px) rotateX(${cardY * 0.05}deg) rotateY(${cardX * 0.05}deg)`;
    }
    
    if (glassLayer1) {
        glassLayer1.style.transform = `translate(${20 + layer1X * 0.15}px, ${20 + layer1Y * 0.15}px) rotate(5deg)`;
    }
    
    if (glassLayer2) {
        glassLayer2.style.transform = `translate(${-15 + layer2X * 0.12}px, ${-15 + layer2Y * 0.12}px) rotate(-3deg)`;
    }
    
    requestAnimationFrame(updateParallax);
}

// Track mouse movement
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX = (e.clientX - centerX) / (rect.width / 2);
        mouseY = (e.clientY - centerY) / (rect.height / 2);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });
}

// Start parallax animation loop
updateParallax();

// ============================================
// SMOOTH SCROLL FADE-IN FOR SECTIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .tech-card, .project-card, .experience-item, .education-card');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            window.scrollTo({
                top: offsetTop,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            
            // Focus management for accessibility
            if (target.hasAttribute('tabindex')) {
                target.focus();
            } else {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        }
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Escape key to close modals/overlays (ready for future modals)
    if (e.key === 'Escape') {
        // Add modal close functionality here if needed
    }
});

// ============================================
// AVATAR VIDEO HANDLING
// ============================================

const avatarImage = document.getElementById('avatarImage');
if (avatarImage) {
    // Ensure video plays (for autoplay policies)
    if (avatarImage.tagName === 'VIDEO') {
        avatarImage.addEventListener('loadeddata', function() {
            this.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        });
        
        // Handle video errors
        avatarImage.addEventListener('error', function() {
            console.log('Video failed to load');
            // Create a placeholder if video fails
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #5ac8fa 0%, #0071e3 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 80px;
                color: white;
                border-radius: 24px;
            `;
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            this.parentElement.appendChild(placeholder);
        });
    } else {
        // Fallback for image elements
        avatarImage.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #5ac8fa 0%, #0071e3 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 80px;
                color: white;
                border-radius: 24px;
            `;
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            this.parentElement.appendChild(placeholder);
        });
    }
}

// Ensure about section video plays
const aboutAvatar = document.querySelector('.about-avatar');
if (aboutAvatar && aboutAvatar.tagName === 'VIDEO') {
    aboutAvatar.addEventListener('loadeddata', function() {
        this.play().catch(err => {
            console.log('About video autoplay prevented:', err);
        });
    });
}

// ============================================
// ENHANCED SCROLL ANIMATIONS
// ============================================

let lastScrollTop = 0;
let ticking = false;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Parallax for hero background circles
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && scrollTop < window.innerHeight) {
        const parallaxSpeed = scrollTop * 0.5;
        heroBackground.style.transform = `translateY(${parallaxSpeed}px)`;
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

// ============================================
// CARD HOVER ENHANCEMENTS
// ============================================

const cards = document.querySelectorAll('.tech-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });

// ============================================
// 3D CARD TILT EFFECT
// ============================================

function init3DCardTilt() {
    const cards = document.querySelectorAll('.tech-card, .project-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            // Different transforms for different card types
            if (card.classList.contains('tech-card')) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            } else if (card.classList.contains('project-card')) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            } else if (card.classList.contains('education-card')) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(-8px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to default hover state
            if (card.classList.contains('tech-card')) {
                card.style.transform = 'translateY(-8px) rotateX(2deg) rotateY(2deg)';
            } else if (card.classList.contains('project-card')) {
                card.style.transform = 'translateY(-8px) rotateX(2deg) rotateY(-2deg)';
            } else if (card.classList.contains('education-card')) {
                card.style.transform = 'translateY(-8px) rotateX(2deg)';
            }
            
            // Reset after transition
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });
}

// Initialize 3D card tilt after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    init3DCardTilt();
});

// ============================================
// LOADING SCREEN
// ============================================

const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loaderProgress');

function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }
            }, 300);
        }
        if (loaderProgress) {
            loaderProgress.style.width = progress + '%';
        }
    }, 100);
}

// Start loading simulation
window.addEventListener('load', () => {
    simulateLoading();
});

// ============================================
// TYPING ANIMATION FOR HERO TEXT
// ============================================

function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Enable typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Wait for loader to finish
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 1500);
}

// ============================================
// MAGNETIC CURSOR EFFECT (Optional)
// ============================================

function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .social-link, .theme-toggle, .back-to-top');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMagneticEffect();
});

// ============================================
// ENHANCED SCROLL ANIMATIONS
// ============================================

const scrollObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('animated');
        }
    });
}, scrollObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.tech-card, .project-card, .experience-item, .education-card');
    
    animatedElements.forEach(el => {
        if (!el.classList.contains('experience-item')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px) scale(0.95)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        scrollObserver.observe(el);
    });
});

// ============================================
// PARTICLE SYSTEM WITH THREE.JS
// ============================================

function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        // Blue colors
        colors[i] = 0.35;     // R
        colors[i + 1] = 0.78; // G
        colors[i + 2] = 0.98; // B
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        // Update particle positions
        const positions = particles.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.0005;
        }
        particles.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Initialize particle system after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            initParticleSystem();
        }
    }, 1000);
});

// ============================================
// INTERACTIVE TIMELINE
// ============================================

function initInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.experience-item');
    
    timelineItems.forEach((item, index) => {
        // Add click to expand/collapse
        const title = item.querySelector('.experience-title');
        const content = item.querySelector('.experience-content');
        
        if (title && content) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        }
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(item);
    });
}

// Initialize timeline
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveTimeline();
});

// ============================================
// THREE.JS 3D ELEMENTS
// ============================================

function init3DElements() {
    // Add 3D floating icons in hero section
    const heroSection = document.getElementById('hero');
    if (!heroSection || typeof THREE === 'undefined') return;
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'floating-icons-3d';
    iconContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    heroSection.appendChild(iconContainer);
    
    // Create 3D scene for floating icons
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    iconContainer.appendChild(renderer.domElement);
    
    // Create floating geometric shapes
    const shapes = [];
    const shapeCount = 5;
    
    for (let i = 0; i < shapeCount; i++) {
        const geometry = new THREE.TetrahedronGeometry(0.1, 0);
        const material = new THREE.MeshBasicMaterial({
            color: 0x5ac8fa,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const shape = new THREE.Mesh(geometry, material);
        
        shape.position.x = (Math.random() - 0.5) * 10;
        shape.position.y = (Math.random() - 0.5) * 10;
        shape.position.z = (Math.random() - 0.5) * 10;
        
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        
        scene.add(shape);
        shapes.push(shape);
    }
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        shapes.forEach((shape, i) => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D elements after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            init3DElements();
        }
    }, 2000);
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('testimonialPrev');
const nextBtn = document.getElementById('testimonialNext');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            setTimeout(() => {
                card.classList.add('active');
            }, 50);
        }
    });
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Initialize testimonials
if (testimonialCards.length > 0) {
    showTestimonial(0);
    
    // Button events
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    // Dot events
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-play testimonials (optional)
    setInterval(() => {
        nextTestimonial();
    }, 5000); // Change every 5 seconds
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Blog, Newsletter, and Social Media functionality moved to blog-newsletter.js

