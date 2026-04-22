document.addEventListener('DOMContentLoaded', () => {

    // Selecting all elements that need to animate on scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');

    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Intersection Observer callback
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the animation
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial observance
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Add a simple parallax effect to the data orb for extra flair
    const dataOrb = document.querySelector('.data-orb');
    if (dataOrb) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            
            dataOrb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

});
