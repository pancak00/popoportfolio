document.addEventListener('DOMContentLoaded', () => {
    // Gamification State
    let totalXp = 0;
    let discoveredSkills = new Set();
    const xpCounter = document.getElementById('xp-counter');
    const body = document.body;
    let isNoir = false;
    
    // Audio Context for sounds
    const playSound = (freq, type = 'sine', duration = 0.1) => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        } catch(e) { console.log("Audio blocked by browser"); }
    };

    const updateXp = (amount) => {
        totalXp += amount;
        const level = Math.floor(totalXp / 500) + 1;
        xpCounter.textContent = `LVL ${level} | XP ${totalXp}`;
        xpCounter.style.transform = 'scale(1.2)';
        setTimeout(() => xpCounter.style.transform = 'scale(1)', 200);
        
        if (totalXp % 500 === 0 && totalXp !== 0) {
            playSound(880, 'square', 0.3);
        }
    };

    // Snarky Popup Logic
    const snarkPopup = document.getElementById('snark-popup');
    const showSnark = (msg) => {
        snarkPopup.textContent = msg;
        snarkPopup.classList.add('active');
    };
    const hideSnark = () => {
        snarkPopup.classList.remove('active');
    };

    // Card hover snark + XP logic
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const msg = card.getAttribute('data-snark');
            if (msg) showSnark(msg);

            if (!discoveredSkills.has(index)) {
                discoveredSkills.add(index);
                card.classList.add('discovered');
                playSound(440 + (index * 20), 'triangle', 0.1);
                
                const bar = card.querySelector('.xp-bar');
                if (bar) {
                    const finalWidth = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => bar.style.width = finalWidth, 50);
                }
                updateXp(100);
            }
        });

        card.addEventListener('mouseleave', () => {
            hideSnark();
        });
    });


    // --- SE7EN MODE (DOS TERMINAL PERSONA) ---
    const logo = document.querySelector('.logo');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDesc = document.getElementById('hero-desc');
    const heroImg = document.querySelector('.hero .illustration');
    const heroAscii = document.getElementById('hero-ascii');
    const secondaryImg = document.querySelector('.secondary .illustration');
    const navLinks = document.querySelectorAll('nav ul li a');
    const skillTreeTitle = document.querySelector('#skills h2');
    const labTitle = document.querySelector('#project-lab h2');
    const contactTitle = document.querySelector('#contact h2');

    let logoClicks = 0;
    let clickTimer;

    logo.addEventListener('click', () => {
        logoClicks++;
        logo.style.transform = 'scale(0.95)';
        setTimeout(() => logo.style.transform = 'scale(1)', 100);
        playSound(200 + (logoClicks * 50), 'sine', 0.05);

        if (logoClicks === 7) {
            triggerNoir();
            logoClicks = 0;
        }

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { logoClicks = 0; }, 3000);
    });

    const triggerNoir = () => {
        isNoir = !isNoir;
        body.classList.toggle('noir-persona');
        
        if (isNoir) {
            // Hero
            heroTitle.innerHTML = "C:\\> FIND.EXE<br><span style='font-size: 1.5rem; color: #fff; background: var(--noir-accent); padding: 2px 10px;'>SYSTEM_ADMIN</span>";
            heroSubtitle.textContent = "VERSION 7.0 // SE7EN_MODE ACTIVE";
            heroDesc.textContent = "CORE PROCESS: DATA TRACKING. INVESTIGATION PROTOCOLS ENGAGED. SCANNING FOR DIGITAL FOOTPRINTS. ALL SYSTEMS NOMINAL. CONFIDENTIALITY LEVEL: MAXIMUM.";
            
            if(heroAscii) heroAscii.style.display = 'none';
            heroImg.style.display = 'block';
            heroImg.src = "hero-investigator.png";
            
            secondaryImg.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzJ1Z3R2bDJzMWtsZ3VnY3gyNTdlNTY3cW0yeXAxYmZ6cTJueGJrNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/31X5ofUNHSjjf0o2KQ/giphy.gif";
            secondaryImg.style.filter = "grayscale(1) contrast(2) brightness(1)";
            
            // Nav
            navLinks[0].textContent = "DIR /SYSTEM";
            navLinks[1].textContent = "DIR /FILES";
            navLinks[2].textContent = "SEND_MSG";
            
            // Section Titles
            skillTreeTitle.innerHTML = "[ SYSTEM_DUMP ]<br>SKILL_SET_ARRAY";
            labTitle.innerHTML = "[ CASE_LOG ]<br>EXHIBIT_VIEWER";
            contactTitle.innerHTML = "[ CONNECT_REMOTE ]";

            showSnark("SYSTEM BOOTED. LOADING SE7EN_PROTOCOL.");
            playSound(200, 'square', 0.2); 
        } else {
            heroTitle.innerHTML = "i do<br>stuffs.";
            heroSubtitle.textContent = "Developer? Sure. But also other things.";
            heroDesc.textContent = "From building PCs to building backends, and from custom keyboards to custom melodies. I'm essentially a technical swiss-army knife that occasionally needs rebooting.";
            
            if(heroAscii) heroAscii.style.display = 'block';
            heroImg.style.display = 'none';
            
            secondaryImg.src = "secondary-agency.png";
            secondaryImg.style.filter = "none";
            
            // Nav
            navLinks[0].textContent = "The Vibe";
            navLinks[1].textContent = "The Stuffs";
            navLinks[2].textContent = "The Signal";

            // Section Titles
            skillTreeTitle.textContent = "The Skill Tree";
            labTitle.textContent = "The Project Lab";
            contactTitle.textContent = "SAY WHATSUP";

            showSnark("Exiting System.");
            playSound(440, 'sine', 0.2);
        }
    };

    // Scroll reveal
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

    console.log("%c--- BIOS v7.0 ONLINE ---", "color: #0000aa; font-weight: bold; font-size: 16px;");
});
