// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimized scroll handler - combines navbar and parallax
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');
const isMobileDevice = window.innerWidth <= 768;
let scrollTicking = false;

// Add will-change for GPU acceleration
if (hero && !isMobileDevice) {
    hero.style.willChange = 'transform';
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Navbar background
            if (scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }

            // Parallax effect - only on desktop and when hero is visible
            if (hero && !isMobileDevice && scrollY < window.innerHeight) {
                hero.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
            }

            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

// Simple AOS (Animate On Scroll) implementation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Gallery lightbox effect (optional enhancement)
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${item.src}" alt="${item.alt}">
                <span class="close-lightbox">&times;</span>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Add lightbox styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90vh;
            }

            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 10px;
            }

            .close-lightbox {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 3rem;
                color: white;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .close-lightbox:hover {
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(style);

        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
                style.remove();
            }, 300);
        };

        lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    });
});


// Add cursor effect - only on desktop (not touch devices)
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        }
    `;
    document.head.appendChild(cursorStyle);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(255, 0, 110, 0.8)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(102, 126, 234, 0.6)';
        });
    });
}

// Optimized particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50; // Balanced for performance

    // Enhanced color palette with brighter colors
    const colors = [
        'rgba(102, 126, 234, 0.9)',  // Bright purple-blue
        'rgba(118, 75, 162, 0.85)',   // Bright purple
        'rgba(255, 0, 110, 0.8)',    // Bright pink accent
        'rgba(167, 139, 250, 0.9)',  // Bright light purple
        'rgba(139, 92, 246, 0.85)',   // Bright violet
        'rgba(124, 58, 237, 0.8)',   // Deep purple
        'rgba(236, 72, 153, 0.75)',  // Hot pink
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Larger particles with more variation
        const size = Math.random() * 10 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        // Stronger glow effect
        particle.style.boxShadow = `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`;

        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${Math.random() * 150}px`;

        // Faster animation
        const duration = Math.random() * 10 + 8; // 8-18 seconds (faster)
        particle.style.animationDuration = `${duration}s`;

        // Random delay
        particle.style.animationDelay = `${Math.random() * 6}s`;

        particlesContainer.appendChild(particle);
    }
}

// Subtle light orbs (previous version)
function createLightOrbs() {
    const sections = document.querySelectorAll('.music, .about');

    // Enhanced color palette for orbs
    const orbColors = [
        'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(118, 75, 162, 0.35) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(255, 0, 110, 0.25) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)',
    ];

    sections.forEach(section => {
        // Create 3-4 orbs per section for richer effect
        const orbCount = Math.floor(Math.random() * 2) + 3;

        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'light-orb';

            // Random size between 200-400px
            const size = Math.random() * 200 + 200;
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;

            // Random position
            orb.style.top = `${Math.random() * 80}%`;
            orb.style.left = `${Math.random() * 80}%`;

            // Random color from palette
            orb.style.background = orbColors[Math.floor(Math.random() * orbColors.length)];

            // Varied animation
            orb.style.animationDuration = `${Math.random() * 8 + 10}s`;
            orb.style.animationDelay = `${Math.random() * 4}s`;

            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.appendChild(orb);
        }
    });
}

// Video controls with preferences storage
function initVideoAudioControls() {
    const videoContainers = document.querySelectorAll('.single-cover');
    const isMobile = window.innerWidth <= 768;

    // Load user preferences from localStorage
    const getPreference = (key, defaultValue) => {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    };

    const savePreference = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Load saved volume preference
    const savedVolume = getPreference('videoVolume', 70);

    videoContainers.forEach(container => {
        const video = container.querySelector('.cover-video');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const playIcon = container.querySelector('.play-icon');
        const pauseIcon = container.querySelector('.pause-icon');
        const volumeSlider = container.querySelector('.volume-slider');
        const volumeIcon = container.querySelector('.volume-icon');

        if (!video) return;

        // Pause video initially - will play on hover/click
        video.pause();
        video.muted = true;
        video.currentTime = 0;

        // Set initial volume from saved preference
        video.volume = savedVolume / 100;
        if (volumeSlider) volumeSlider.value = savedVolume;

        // Update volume icon based on level
        const updateVolumeIcon = (volume) => {
            if (!volumeIcon) return;
            if (volume === 0) {
                volumeIcon.textContent = '🔇';
            } else if (volume < 50) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
        };

        updateVolumeIcon(savedVolume);

        // Play/Pause button functionality
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    video.muted = false;
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                } else {
                    video.pause();
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            });
        }

        // Volume slider functionality
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value;
                video.volume = volume / 100;
                updateVolumeIcon(parseInt(volume));
                savePreference('videoVolume', volume);

                // Unmute if volume is increased from 0
                if (volume > 0 && video.muted) {
                    video.muted = false;
                }
            });
        }

        // Desktop: play on hover with sound (requires one click to unlock)
        if (!isMobile) {
            let userInteracted = false;

            // One click anywhere unlocks audio for all videos
            document.addEventListener('click', () => {
                userInteracted = true;
            }, { once: true });

            container.addEventListener('mouseenter', () => {
                video.play().then(() => {
                    if (userInteracted) {
                        video.muted = false;
                        video.volume = savedVolume / 100;
                    }
                }).catch(() => {});
            });

            container.addEventListener('mouseleave', () => {
                video.pause();
                video.muted = true;
            });
        }

        // Update play/pause icon when video state changes
        video.addEventListener('play', () => {
            if (playIcon && pauseIcon) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
        });

        video.addEventListener('pause', () => {
            if (playIcon && pauseIcon) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Optimize videos for mobile - tap to play/pause
function optimizeVideosForMobile() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        const videoContainers = document.querySelectorAll('.single-cover');

        videoContainers.forEach(container => {
            const video = container.querySelector('.cover-video');
            if (!video) return;

            // Videos start paused on mobile
            video.pause();
            video.muted = true;

            // Tap anywhere on video container to play/pause
            container.addEventListener('click', function(e) {
                // Don't trigger if clicking on controls
                if (e.target.closest('.play-pause-btn') || e.target.closest('.volume-slider')) {
                    return;
                }

                if (video.paused) {
                    video.play();
                    video.muted = false;
                    video.volume = 0.7;
                } else {
                    video.pause();
                    video.muted = true;
                }
            });
        });
    }
}

// Initialize particles and orbs on load
window.addEventListener('load', () => {
    createParticles();
    createLightOrbs();
    initVideoAudioControls();
    initMobileMenu();
    optimizeVideosForMobile();
});

// Handle window resize
window.addEventListener('resize', () => {
    optimizeVideosForMobile();
});

console.log('OZ Portfolio - Ready ✨');
