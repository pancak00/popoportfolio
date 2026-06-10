document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately on load to set correct state
    
    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // --- 3. Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // --- 4. Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (matchingLink) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    matchingLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-80px 0px -5% 0px'
    });
    
    sections.forEach(section => {
        activeNavObserver.observe(section);
    });

    // --- 5. Cozy Soft 3D Mouse Tilt Effect ---
    const heroSection = document.querySelector('.hero-section');

    const createHeroParticles = () => {
        if (!heroSection) return;

        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'hero-particle';

            const size = 6 + Math.random() * 16;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.top = `${Math.random() * 85}%`;
            particle.style.left = `${Math.random() * 90}%`;
            particle.style.animationDuration = `${8 + Math.random() * 8}s`;
            particle.style.animationDelay = `${Math.random() * 4}s`;

            heroSection.appendChild(particle);
        }
    };

    const animateHeroIntro = () => {
        setTimeout(() => {
            document.body.classList.add('hero-loaded');
        }, 120);
    };

    createHeroParticles();
    animateHeroIntro();

    const tiltCards = document.querySelectorAll('.tech-config-card, .visualizer-card, .project-card, .skill-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse x relative to card
            const y = e.clientY - rect.top;  // Mouse y relative to card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt degrees (max 10 degrees for cozy subtlety)
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;
            
            // Apply fluid cozy transformations
            card.style.transform = `perspective(1000px) translate3d(0px, -6px, 12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Adjust the cozy diffused shadow angle based on cursor position
            const shadowX = rotateY * -1;
            const shadowY = (rotateX * 1) + 15;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 35px rgba(35, 22, 12, 0.07)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transforms and clear inline styles to let index.css smoothly transitions back
            card.style.transform = 'perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '';
        });
    });

    // --- 6. Simulated Terminal Typing ---
    const words = ["hi, welcome", "i'm harold", "i mess with code & sound", "enjoy your stay!"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextSpan = document.getElementById('typing-text');
    
    if (typingTextSpan) {
        const typeEffect = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            
            typingTextSpan.textContent = currentWord.substring(0, charIndex);
            
            let typeSpeed = isDeleting ? 35 : 70; // Smooth typing & deleting speeds
            
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the full word
                typeSpeed = 1600;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                // Pause before typing next word
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        };
        
        typeEffect();
    }
    
    console.log("%c⚡ Portfolio Engine ready! ⚡", "color: #c2693f; font-weight: bold; font-size: 14px;");
});
