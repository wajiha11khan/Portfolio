document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // PAGE LOADER
    // ============================
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress');
    
    if (loader && progressBar) {
        // Simulate progress
        setTimeout(() => { progressBar.style.width = '30%'; }, 100);
        setTimeout(() => { progressBar.style.width = '70%'; }, 400);
        setTimeout(() => { progressBar.style.width = '100%'; }, 800);
        
        setTimeout(() => {
            loader.classList.add('loaded');
            document.body.style.overflow = '';
        }, 1500);
    } else {
        document.body.style.overflow = '';
    }

    // ============================
    // PARTICLES.JS INITIALIZATION
    // ============================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#0ea5e9" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#0ea5e9", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // ============================
    // 3D TILT EFFECT (PROJECT CARDS)
    // ============================
    const projectCards = document.querySelectorAll('.project-detailed-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.3), 0 0 20px rgba(14, 165, 233, 0.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            card.style.boxShadow = '';
        });
    });

    // ============================
    // SCROLL ANIMATIONS
    // ============================
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');

    // Header scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    const observerOptions = { threshold: 0.15 };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => fadeObserver.observe(element));

    // ============================
    // HAMBURGER MENU
    // ============================
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileOverlay?.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);
        mobileOverlay?.addEventListener('click', toggleMenu);
        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMenu));
    }

    // ============================
    // WORK WITH ME MODAL
    // ============================
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const workWithMeBtn = document.getElementById('work-with-me-btn');
    const openModalSectionBtn = document.getElementById('open-modal-section-btn');

    const openModal = () => {
        modalOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    };

    workWithMeBtn?.addEventListener('click', openModal);
    openModalSectionBtn?.addEventListener('click', openModal);
    modalCloseBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) closeModal();
    });

    // ============================
    // OTHER SERVICE TOGGLE
    // ============================
    const serviceSelect = document.getElementById('service');
    const otherServiceGroup = document.getElementById('other-service-group');
    
    serviceSelect?.addEventListener('change', () => {
        if (serviceSelect.value === 'Others') {
            otherServiceGroup.style.display = 'flex';
        } else {
            otherServiceGroup.style.display = 'none';
        }
    });

});
