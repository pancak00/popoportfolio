document.addEventListener('DOMContentLoaded', () => {
    // Snarky Popup Logic (Agency Style)
    const snarkPopup = document.getElementById('snark-popup');
    const showSnark = (msg) => {
        snarkPopup.textContent = msg;
        snarkPopup.classList.add('active');
        setTimeout(() => snarkPopup.classList.remove('active'), 3000);
    };

    // Card hover snark
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const msg = card.getAttribute('data-snark');
            showSnark(msg);
        });
    });

    // Plans button runaway (The "Hire Me" check)
    const plansBtn = document.getElementById('plans-btn');
    let escaped = false;
    plansBtn.addEventListener('mouseenter', () => {
        if (!escaped) {
            plansBtn.style.position = 'relative';
            plansBtn.style.transform = `translate(${Math.random() > 0.5 ? 100 : -100}px, ${Math.random() > 0.5 ? 50 : -50}px) rotate(5deg)`;
            showSnark("I'm probably busy building a keyboard or playing bass. Check back later.");
            escaped = true;
            setTimeout(() => {
                plansBtn.style.transform = 'none';
                escaped = false;
            }, 2000);
        }
    });

    // Logo click snark
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        showSnark("JUST.ME. Because 'Polymath' sounded too pretentious.");
    });

    // Scroll reveal for illustrations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1) rotate(0deg)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.illustration').forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8) rotate(-10deg)';
        img.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(img);
    });

    console.log("%c--- PORTFOLIO ONLINE ---", "color: #e899d2; font-weight: bold; font-size: 16px;");
    console.log("%cCurrent Status: Soldering something.", "color: #f4c542; font-weight: bold;");
    console.log("%cCheck out my messy code: https://github.com/pancak00", "color: #000; font-weight: bold; background: #fff; padding: 2px 5px;");
});
