// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let navbarScrolled = false;
window.addEventListener('scroll', () => {
    const shouldBeScrolled = window.scrollY > 100;
    if (shouldBeScrolled !== navbarScrolled) {
        navbarScrolled = shouldBeScrolled;
        navbar.classList.toggle('scrolled', shouldBeScrolled);
    }
}, { passive: true });

// AOS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('aos-animate');
    });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${item.src}" alt="${item.alt}">
                <span class="close-lightbox">&times;</span>
            </div>`;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        const style = document.createElement('style');
        style.textContent = `
            .lightbox { position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.95);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease }
            @keyframes fadeIn { from{opacity:0} to{opacity:1} }
            .lightbox-content { position:relative;max-width:90%;max-height:90vh }
            .lightbox-content img { max-width:100%;max-height:90vh;object-fit:contain;border-radius:10px }
            .close-lightbox { position:absolute;top:-40px;right:0;font-size:3rem;color:white;cursor:pointer;transition:transform .3s ease }
            .close-lightbox:hover { transform:rotate(90deg) }`;
        document.head.appendChild(style);
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut .3s ease';
            setTimeout(() => { lightbox.remove(); document.body.style.overflow = ''; style.remove(); }, 300);
        };
        lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `@keyframes fadeOut { from{opacity:1} to{opacity:0} }`;
        document.head.appendChild(fadeOutStyle);
    });
});

// Custom cursor (desktop only)
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
if (!isTouchDevice && window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `.custom-cursor{width:20px;height:20px;border:2px solid rgba(102,126,234,.6);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transition:all .1s ease;transform:translate(-50%,-50%)}`;
    document.head.appendChild(cursorStyle);
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.width = '40px'; cursor.style.height = '40px'; cursor.style.borderColor = 'rgba(255,0,110,.8)'; });
        el.addEventListener('mouseleave', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; cursor.style.borderColor = 'rgba(102,126,234,.6)'; });
    });
}

// Particles
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['rgba(102,126,234,.9)','rgba(118,75,162,.85)','rgba(255,0,110,.8)','rgba(167,139,250,.9)','rgba(139,92,246,.85)','rgba(124,58,237,.8)','rgba(236,72,153,.75)'];
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 10 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `width:${size}px;height:${size}px;background:${color};box-shadow:0 0 ${size*4}px ${color},0 0 ${size*8}px ${color};left:${Math.random()*100}%;bottom:-${Math.random()*150}px;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*6}s`;
        container.appendChild(p);
    }
}

// Light orbs
function createLightOrbs() {
    const orbColors = [
        'radial-gradient(circle, rgba(102,126,234,.3) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(118,75,162,.35) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(255,0,110,.25) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(167,139,250,.3) 0%, transparent 70%)',
    ];
    document.querySelectorAll('.music, .about').forEach(section => {
        const count = Math.floor(Math.random() * 2) + 3;
        for (let i = 0; i < count; i++) {
            const orb = document.createElement('div');
            orb.className = 'light-orb';
            const size = Math.random() * 200 + 200;
            orb.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*80}%;left:${Math.random()*80}%;background:${orbColors[Math.floor(Math.random()*orbColors.length)]};animation-duration:${Math.random()*8+10}s;animation-delay:${Math.random()*4}s`;
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.appendChild(orb);
        }
    });
}

// ─── Color extraction from video frame ───────────────────────────────────────
function extractVideoColor(video) {
    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    try {
        ctx.drawImage(video, 0, 0, 80, 80);
        const data = ctx.getImageData(0, 0, 80, 80).data;
        let rW = 0, gW = 0, bW = 0, totalW = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const sat = max === 0 ? 0 : (max - min) / max;
            const bright = max / 255;
            // Favor saturated, medium-brightness pixels (avoids black & white)
            if (sat > 0.18 && bright > 0.12 && bright < 0.92) {
                const w = sat * (1 - Math.abs(bright - 0.5) * 1.2);
                rW += r * w; gW += g * w; bW += b * w;
                totalW += w;
            }
        }
        if (totalW < 5) return '102 126 234';
        return `${Math.round(rW / totalW)} ${Math.round(gW / totalW)} ${Math.round(bW / totalW)}`;
    } catch (e) {
        return '102 126 234';
    }
}

const navInfinity = document.querySelector('.navbar-infinity');
const infinityFill = document.getElementById('infinity-fill');

function applyGlowColor(card, color) {
    card.style.setProperty('--glow-color', color);
    const miniPlayer = document.getElementById('mini-player');
    if (miniPlayer) miniPlayer.style.setProperty('--mini-glow', color);
    const [r, g, b] = color.split(' ');
    // Change the SVG fill color directly
    if (infinityFill) infinityFill.style.fill = `rgb(${r},${g},${b})`;
    // Amplified double glow
    if (navInfinity) {
        navInfinity.style.filter = `drop-shadow(0 0 18px rgba(${r},${g},${b},1)) drop-shadow(0 0 6px rgba(${r},${g},${b},0.9))`;
    }
}

function resetGlowColor() {
    if (infinityFill) infinityFill.style.fill = '#ffffff';
    if (navInfinity) {
        navInfinity.style.filter = 'drop-shadow(0 0 10px rgba(102,126,234,0.6)) drop-shadow(0 0 4px rgba(102,126,234,0.4))';
    }
}

// ─── Track navigation dots ────────────────────────────────────────────────────
function initTrackNav() {
    const cards = document.querySelectorAll('.single-card');
    if (!cards.length) return;

    const nav = document.createElement('div');
    nav.className = 'track-nav';
    nav.setAttribute('aria-label', 'Track navigation');
    const dots = [];

    cards.forEach((card, i) => {
        const dot = document.createElement('button');
        dot.className = 'track-dot';
        dot.setAttribute('aria-label', `Track ${i + 1}`);
        dot.addEventListener('click', () => card.scrollIntoView({ behavior: 'smooth', block: 'center' }));
        nav.appendChild(dot);
        dots.push(dot);
    });

    document.body.appendChild(nav);

    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const idx = Array.from(cards).indexOf(entry.target);
            if (idx !== -1) dots[idx].classList.toggle('active', entry.isIntersecting);
        });
    }, { threshold: 0.5 });

    cards.forEach(card => dotObserver.observe(card));
}

// ─── Mini-player ──────────────────────────────────────────────────────────────
let nowPlaying = { video: null, card: null };

function initMiniPlayer() {
    const miniPlayer = document.getElementById('mini-player');
    if (!miniPlayer) return;

    const miniTitle = miniPlayer.querySelector('.mini-player-title');
    const miniPlayBtn = miniPlayer.querySelector('.mini-player-play');
    const mpPlayIcon = miniPlayer.querySelector('.mp-play-icon');
    const mpPauseIcon = miniPlayer.querySelector('.mp-pause-icon');
    const miniGotoBtn = miniPlayer.querySelector('.mini-player-goto');
    const miniEq = miniPlayer.querySelector('.mini-eq');

    // Populate EQ spans
    if (miniEq) {
        for (let i = 0; i < 3; i++) miniEq.appendChild(document.createElement('span'));
    }

    // Mini play/pause button
    miniPlayBtn && miniPlayBtn.addEventListener('click', () => {
        if (!nowPlaying.video) return;
        nowPlaying.video.paused ? nowPlaying.video.play() : nowPlaying.video.pause();
    });

    // Go to track
    miniGotoBtn && miniGotoBtn.addEventListener('click', () => {
        nowPlaying.card && nowPlaying.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Observe cards: show mini-player when playing card leaves viewport
    const visObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target !== nowPlaying.card) return;
            if (nowPlaying.video && !nowPlaying.video.paused) {
                miniPlayer.classList.toggle('visible', !entry.isIntersecting);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.single-card').forEach(c => visObs.observe(c));

    // Sync function called from video events
    window.syncMiniPlayer = (video, card, isPlaying) => {
        const title = card.querySelector('.cover-overlay h3');
        if (miniTitle) miniTitle.textContent = title ? title.textContent : '—';

        if (mpPlayIcon && mpPauseIcon) {
            mpPlayIcon.style.display = isPlaying ? 'none' : 'block';
            mpPauseIcon.style.display = isPlaying ? 'block' : 'none';
        }

        miniPlayer.classList.toggle('playing', isPlaying);

        if (!isPlaying) {
            miniPlayer.classList.remove('visible');
        } else {
            const rect = card.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
            miniPlayer.classList.toggle('visible', !inView);
        }
    };
}

// ─── Video controls ───────────────────────────────────────────────────────────
function initVideoAudioControls() {
    const videoContainers = document.querySelectorAll('.single-cover');
    const isMobile = window.innerWidth <= 768;
    const getPreference = (key, def) => { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; };
    const savePreference = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const savedVolume = getPreference('videoVolume', 70);

    videoContainers.forEach(container => {
        const video = container.querySelector('.cover-video');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const playIcon = container.querySelector('.play-icon');
        const pauseIcon = container.querySelector('.pause-icon');
        const volumeSlider = container.querySelector('.volume-slider');
        const volumeIcon = container.querySelector('.volume-icon');
        const card = container.closest('.single-card');
        const grid = container.closest('.singles-grid');

        if (!video) return;

        video.pause();
        video.muted = true;
        video.currentTime = 0;
        video.volume = savedVolume / 100;
        if (volumeSlider) volumeSlider.value = savedVolume;

        const updateVolumeIcon = (vol) => {
            if (!volumeIcon) return;
            volumeIcon.textContent = vol === 0 ? '🔇' : vol < 50 ? '🔉' : '🔊';
        };
        updateVolumeIcon(savedVolume);

        // EQ bars
        const audioIndicator = container.querySelector('.audio-indicator');
        if (audioIndicator && !audioIndicator.children.length) {
            for (let i = 0; i < 4; i++) audioIndicator.appendChild(document.createElement('span'));
        }

        // Play button
        playPauseBtn && playPauseBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (video.paused) {
                // Pause any other playing video
                if (nowPlaying.video && nowPlaying.video !== video) nowPlaying.video.pause();
                video.play();
                video.muted = false;
            } else {
                video.pause();
            }
        });

        // Volume
        volumeSlider && volumeSlider.addEventListener('input', e => {
            const vol = e.target.value;
            video.volume = vol / 100;
            if (vol > 0 && video.muted) video.muted = false;
            updateVolumeIcon(parseInt(vol));
            savePreference('videoVolume', vol);
        });

        // Click on cover (desktop)
        if (!isMobile) {
            container.addEventListener('click', e => {
                if (e.target.closest('.play-pause-btn') || e.target.closest('.volume-slider')) return;
                if (video.paused) {
                    if (nowPlaying.video && nowPlaying.video !== video) nowPlaying.video.pause();
                    video.play();
                    video.muted = false;
                    video.volume = savedVolume / 100;
                } else {
                    video.pause();
                }
            });
        }

        // Play event
        let pauseDebounce = null;
        video.addEventListener('play', () => {
            // Cancel any pending pause handling (buffering false-positive)
            clearTimeout(pauseDebounce);

            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            if (card) card.classList.add('is-playing');
            if (grid) grid.classList.add('has-playing');
            nowPlaying = { video, card };

            // Extract dominant color — retry up to 3× if video frame not ready
            const tryExtract = (attempt) => {
                setTimeout(() => {
                    const color = extractVideoColor(video);
                    if (color !== '102 126 234' || attempt >= 3) {
                        applyGlowColor(card, color);
                    } else {
                        tryExtract(attempt + 1);
                    }
                }, attempt === 0 ? 500 : 1000);
            };
            tryExtract(0);

            if (window.syncMiniPlayer) window.syncMiniPlayer(video, card, true);
        });

        // Pause event — debounced 250ms to ignore buffering micro-pauses
        video.addEventListener('pause', () => {
            pauseDebounce = setTimeout(() => {
                if (!video.paused) return; // video resumed during delay
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
                if (card) card.classList.remove('is-playing');
                if (grid && !grid.querySelector('.single-card.is-playing')) {
                    grid.classList.remove('has-playing');
                    resetGlowColor();
                }
                if (window.syncMiniPlayer) window.syncMiniPlayer(video, card, false);
            }, 250);
        });
    });
}

// Mobile tap to play/pause
function optimizeVideosForMobile() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.single-cover').forEach(container => {
        const video = container.querySelector('.cover-video');
        if (!video) return;
        video.pause(); video.muted = true;
        container.addEventListener('click', e => {
            if (e.target.closest('.play-pause-btn') || e.target.closest('.volume-slider')) return;
            if (video.paused) {
                if (nowPlaying.video && nowPlaying.video !== video) nowPlaying.video.pause();
                video.play(); video.muted = false; video.volume = 0.7;
            } else {
                video.pause(); video.muted = true;
            }
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!menuToggle) return;
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    document.addEventListener('click', e => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

window.addEventListener('load', () => {
    createParticles();
    createLightOrbs();
    initVideoAudioControls();
    initMobileMenu();
    optimizeVideosForMobile();
    initTrackNav();
    initMiniPlayer();
});

window.addEventListener('resize', optimizeVideosForMobile);

console.log('OZ Portfolio - Ready ✨');
