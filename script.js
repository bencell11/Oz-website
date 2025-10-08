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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add cursor effect
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

// Particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15; // Subtle amount

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size (small particles)
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${Math.random() * 100}px`;

        // Random animation duration (slower = more subtle)
        const duration = Math.random() * 15 + 15; // 15-30 seconds
        particle.style.animationDuration = `${duration}s`;

        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Create light orbs
function createLightOrbs() {
    const sections = document.querySelectorAll('.music, .about, .gallery');

    sections.forEach(section => {
        const orb1 = document.createElement('div');
        orb1.className = 'light-orb';
        orb1.style.width = '300px';
        orb1.style.height = '300px';
        orb1.style.top = `${Math.random() * 50}%`;
        orb1.style.left = `${Math.random() * 50}%`;
        orb1.style.animationDuration = `${Math.random() * 5 + 8}s`;

        const orb2 = document.createElement('div');
        orb2.className = 'light-orb';
        orb2.style.width = '250px';
        orb2.style.height = '250px';
        orb2.style.top = `${Math.random() * 50 + 50}%`;
        orb2.style.right = `${Math.random() * 30}%`;
        orb2.style.animationDuration = `${Math.random() * 5 + 10}s`;
        orb2.style.animationDelay = `${Math.random() * 3}s`;

        section.style.position = 'relative';
        section.appendChild(orb1);
        section.appendChild(orb2);
    });
}

// Initialize particles and orbs on load
window.addEventListener('load', () => {
    createParticles();
    createLightOrbs();
});

console.log('OZ Portfolio - Ready ✨');
