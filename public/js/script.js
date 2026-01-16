// Preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Minimum time to show preloader (in milliseconds) to let GIF finish
        // GIF is approx 7 seconds
        const minDisplayTime = 7000;

        // Calculate time elapsed since page load started
        const loadTime = performance.now();

        // precise wait time needed
        const waitTime = Math.max(0, minDisplayTime - loadTime);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, waitTime);
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';

            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');

            // Update aria-expanded
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);

            // Add animation class
            if (!isExpanded) {
                mobileMenu.classList.add('mobile-menu-enter');
                setTimeout(() => {
                    mobileMenu.classList.add('mobile-menu-enter-active');
                }, 10);
            } else {
                mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-enter-active');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-enter-active');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-enter-active');
                mobileMenuButton.focus();
            }
        });
    }

    // Header shadow on scroll
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 8) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Check for reduced motion preference
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Trap focus in mobile menu when open
    if (mobileMenu) {
        mobileMenu.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                const focusableContent = mobileMenu.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Hero Background Slideshow
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        const heroImages = [
            'https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719804/hero-image-3_bkbtkk.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/hero-image2_vzggxt.webp',
            'https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719804/hero-image-3_bkbtkk.jpg'
        ];

        let currentImageIndex = 0;

        function updateHeroBackground() {
            const currentImage = heroImages[currentImageIndex];
            heroSection.style.backgroundImage = `url('${currentImage}')`;

            // Move to next image, loop back to start if at end
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        }

        // Set initial background image
        updateHeroBackground();

        // Change background every 7 seconds
        setInterval(updateHeroBackground, 7000);
    }

    // Team Members Marquee (Mobile)
    const teamTrack = document.getElementById('team-track');
    if (teamTrack) {
        // Clone children for infinite scroll
        const teamMembers = Array.from(teamTrack.children);
        teamMembers.forEach(member => {
            const clone = member.cloneNode(true);
            clone.classList.add('team-clone');
            clone.setAttribute('aria-hidden', 'true'); // Hide from screen readers to avoid duplication
            teamTrack.appendChild(clone);
        });
    }
});