// Preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Check if preloader has already played in this session
        if (sessionStorage.getItem('preloaderPlayed')) {
            preloader.style.display = 'none';
            return;
        }

        // Minimum time to show preloader (in milliseconds) to let GIF finish
        // GIF is approx 7 seconds
        const minDisplayTime = 7000;

        // Calculate time elapsed since page load started
        const loadTime = performance.now();

        // precise wait time needed
        const waitTime = Math.max(0, minDisplayTime - loadTime);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            sessionStorage.setItem('preloaderPlayed', 'true');
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, waitTime);
    }
});

// Active Link Indicator
function initActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Handle index.html and root path
        if ((currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/')) && (href === 'index.html' || href === '/')) {
            link.classList.add('active-nav-link');
        } else if (href && currentPath.includes(href) && href !== 'index.html' && href !== '/') {
            link.classList.add('active-nav-link');
        }
    });
}

document.addEventListener('DOMContentLoaded', initActiveLink);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');

    // Function to open the mobile menu overlay
    const openMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-full');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'true');

        // Prevent background scrolling when menu is open
        document.body.style.overflow = 'hidden';
    };

    // Function to close the mobile menu overlay
    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-full');
        if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');

        // Restore background scrolling
        document.body.style.overflow = '';
    };

    // Open button logic
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    // Close button logic
    if (mobileMenuCloseButton && mobileMenu) {
        mobileMenuCloseButton.addEventListener('click', closeMobileMenu);
    }

    // Optional: Close when clicking any link inside the mobile menu
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('opacity-100')) {
            closeMobileMenu();
            if (mobileMenuButton) mobileMenuButton.focus();
        }
    });

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

    // Initialize Lenis for Smooth Scrolling
    const initLenis = () => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lenis@1.1.20/dist/lenis.min.js';
        script.onload = () => {
            window.lenis = new Lenis({
                autoRaf: true,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                smoothTouch: false,
                touchMultiplier: 2,
            });

            // Re-implement Smooth anchor scrolling using Lenis
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId && targetId !== '#') {
                        const target = document.querySelector(targetId);
                        if (target) {
                            e.preventDefault();
                            if (window.lenis) window.lenis.scrollTo(target);

                            // Close mobile menu if open
                            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                                mobileMenu.classList.add('hidden');
                                mobileMenuButton.setAttribute('aria-expanded', 'false');
                            }
                        }
                    }
                });
            });
        };
        document.head.appendChild(script);
    };

    // Only init if not user prefers reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initLenis();
    } else {
        // Fallback for native smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'auto', block: 'start' });
                        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                            mobileMenuButton.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });
        });
    }

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

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');

    if (lightbox && lightboxImg) {
        let currentScale = 1;
        const MIN_SCALE = 0.5;
        const MAX_SCALE = 4;
        const SCALE_STEP = 0.25;

        // Open Lightbox
        document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const img = trigger.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    currentScale = 1;
                    lightboxImg.style.transform = `scale(${currentScale})`;
                    lightbox.classList.remove('hidden');
                    lightbox.classList.add('flex');
                    // Small delay to allow display block to apply before opacity transition
                    setTimeout(() => {
                        lightbox.classList.remove('opacity-0');
                    }, 10);
                }
            });
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.add('opacity-0');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                lightboxImg.src = '';
            }, 300); // match duration-300
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        // Close on background click (but not when clicking the image or buttons)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.id === 'lightbox-img-container') {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });

        // Zoom functionality
        const updateZoom = (newScale) => {
            currentScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
            lightboxImg.style.transform = `scale(${currentScale})`;
        };

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => updateZoom(currentScale + SCALE_STEP));
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => updateZoom(currentScale - SCALE_STEP));
        }

        // Mouse wheel zoom
        const lightboxContainer = document.getElementById('lightbox-img-container');
        if (lightboxContainer) {
            lightboxContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY * -0.005; // slow down zoom speed
                updateZoom(currentScale + delta);
            }, { passive: false });
        }
    }

    // Case Study Viewer Logic (Long Scroll)
    const caseStudies = {
        'brand-v1': [
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544598/Artboard_1.jpg_rabsux.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544597/Artboard_1_copy_2.jpg_junpte.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544598/Artboard_1_copy_4.jpg_sgokda.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544599/Artboard_1_copy_5.jpg_omxien.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544597/Artboard_30_copy_7.jpg_smd0v9.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544597/Artboard_31.jpg_ffcqls.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544599/Artboard_31_copy_2.jpg_ej33cf.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/q_auto/f_auto/v1776544598/Artboard_31_copy.jpg_pxkg75.jpg'
        ],
        'brand-v2': [
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732934/Artboard_1_y1kixc.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732927/Artboard_1_copy_1_uqxe3u.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732926/Artboard_1_copy_4_rhsrcw.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732923/Artboard_1_copy_5_grrnh6.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732923/Artboard_1_copy_9_i8cxpj.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732926/Artboard_1_copy_12_omaq4v.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732926/Artboard_1_copy_13_wez2oa.png',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776732930/Artboard_1_copy_17_m9vgxy.png'
        ],
        'brand-v3': [
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954782/Artboard_1_copy.jpg_vcgluo.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954782/Artboard_1.jpg_xgvrjr.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954782/Artboard_1_copy_4.jpg_xcabf2.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954783/Artboard_1_copy_2.jpg_muxdje.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954782/Artboard_1_copy_3.jpg_fku1o4.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954782/Artboard_1_copy_6.jpg_q6dm05.jpg',
            'https://res.cloudinary.com/dja3u7oha/image/upload/v1776954782/Artboard_1_copy_5.jpg_vefsqr.jpg'
        ]

    };

    const caseStudyOverlay = document.getElementById('case-study-overlay');
    const caseStudyContainer = document.getElementById('case-study-container');
    const caseStudyClose = document.getElementById('case-study-close');

    if (caseStudyOverlay && caseStudyContainer) {
        const openCaseStudy = (studyId) => {
            const images = caseStudies[studyId];
            if (!images) return;

            // Stop Lenis and lock scroll
            if (window.lenis) window.lenis.stop();
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');

            // Clear container
            caseStudyContainer.innerHTML = '';

            // Add images
            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Case Study Image';
                img.loading = 'lazy';
                img.className = 'w-full h-auto rounded-lg shadow-2xl mb-8 md:mb-12';
                caseStudyContainer.appendChild(img);
            });

            // Show overlay
            caseStudyOverlay.classList.remove('hidden');
            caseStudyOverlay.classList.add('block');

            setTimeout(() => {
                caseStudyOverlay.classList.remove('opacity-0');
            }, 10);
        };

        const closeCaseStudy = () => {
            caseStudyOverlay.classList.add('opacity-0');
            
            // Resume Lenis and unlock scroll
            if (window.lenis) window.lenis.start();
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
            
            setTimeout(() => {
                caseStudyOverlay.classList.remove('block');
                caseStudyOverlay.classList.add('hidden');
                caseStudyContainer.innerHTML = '';
            }, 300);
        };

        document.querySelectorAll('.case-study-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const studyId = trigger.getAttribute('data-case-study');
                openCaseStudy(studyId);
            });
        });

        if (caseStudyClose) {
            caseStudyClose.addEventListener('click', closeCaseStudy);
        }

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !caseStudyOverlay.classList.contains('hidden')) {
                closeCaseStudy();
            }
        });

        // Close on background click
        caseStudyOverlay.addEventListener('click', (e) => {
            if (e.target === caseStudyOverlay) {
                closeCaseStudy();
            }
        });
    }
});
