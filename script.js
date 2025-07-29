document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple scroll animations (fade-in effect)
    const sections = document.querySelectorAll('.section-spacing');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add 'fade-in' to the first section immediately if it's visible on load
    // This avoids a delay if the first section is already in view
    if (sections.length > 0) {
        if (sections[0].getBoundingClientRect().top < window.innerHeight) {
            sections[0].classList.add('fade-in');
        }
    }
});
