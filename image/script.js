document.addEventListener('DOMContentLoaded', function() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    const bgImages = document.querySelectorAll('.bg-img');
    
    // Optimized scroll event with requestAnimationFrame
    let lastScrollY = 0;
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionHeight = rect.height;
            
            // Check if section is in view
            if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                const speed = 0.3;
                const offset = (scrollY - sectionTop) * speed;
                const bgImg = section.querySelector('.bg-img');
                
                // Apply parallax effect
                bgImg.style.transform = `translateY(${offset}px)`;
            }
        });
        
        ticking = false;
    }
    
    function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Initialize Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const bgImg = entry.target.querySelector('.bg-img');
            if (entry.isIntersecting) {
                bgImg.style.transition = 'transform 0.1s ease-out';
            } else {
                bgImg.style.transition = 'none';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each parallax section
    parallaxSections.forEach(section => {
        observer.observe(section);
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll);
    
    // Initial call to position elements correctly
    updateParallax();
});
