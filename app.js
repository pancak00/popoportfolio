document.addEventListener('DOMContentLoaded', () => {
    // Gamification State
    let totalXp = 0;
    let discoveredSkills = new Set();
    const xpCounter = document.getElementById('xp-counter');
    
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
        setTimeout(() => snarkPopup.classList.remove('active'), 3000);
    };

    // Card hover snark + XP logic
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const msg = card.getAttribute('data-snark');
            showSnark(msg);

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
    });

    // Plans button runaway
    const plansBtn = document.getElementById('plans-btn');
    let escaped = false;
    plansBtn.addEventListener('mouseenter', () => {
        if (!escaped) {
            plansBtn.style.position = 'relative';
            plansBtn.style.transform = `translate(${Math.random() > 0.5 ? 100 : -100}px, ${Math.random() > 0.5 ? 50 : -50}px) rotate(5deg)`;
            showSnark("I'm probably busy building a keyboard or practicing guitar. Check back later.");
            escaped = true;
            playSound(110, 'sawtooth', 0.2);
            setTimeout(() => {
                plansBtn.style.transform = 'none';
                escaped = false;
            }, 2000);
        }
    });

    // --- PERSONA TOGGLE (THE SE7EN EASTER EGG) ---
    const logo = document.querySelector('.logo');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDesc = document.getElementById('hero-desc');
    const heroImg = document.querySelector('.hero .illustration');
    const secondaryImg = document.querySelector('.secondary .illustration');
    
    let isNoir = false;
    let logoClicks = 0;
    let clickTimer;

    logo.addEventListener('click', () => {
        logoClicks++;
        
        // Visual/Audio feedback for clicking (subtle)
        logo.style.transform = 'scale(0.95)';
        setTimeout(() => logo.style.transform = 'scale(1)', 100);
        playSound(200 + (logoClicks * 50), 'sine', 0.05);

        if (logoClicks === 7) {
            triggerNoir();
            logoClicks = 0;
        }

        // Reset clicks if user waits too long (3 seconds)
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { logoClicks = 0; }, 3000);
    });

    const triggerNoir = () => {
        isNoir = !isNoir;
        document.body.classList.toggle('noir-persona');
        
        if (isNoir) {
            heroTitle.innerHTML = "i find<br>things.";
            heroSubtitle.textContent = "Digital footprint? I'll find it.";
            heroDesc.textContent = "Private investigation on the side. I specialize in gathering intel that doesn't want to be found. From digital forensics to physical stakeouts. Keep it confidential.";
            heroImg.src = "hero-investigator.png";
            secondaryImg.style.filter = "grayscale(1) contrast(1.5)";
            showSnark("DETECTIVE MODE ACTIVATED. WHAT'S IN THE BOX?");
            playSound(110, 'sine', 1.0); // Deep cinematic drone
        } else {
            heroTitle.innerHTML = "i do<br>stuffs.";
            heroSubtitle.textContent = "Developer? Sure. But also other things.";
            heroDesc.textContent = "From building PCs to building backends, and from custom keyboards to custom melodies. I'm essentially a technical swiss-army knife that occasionally needs rebooting.";
            heroImg.src = "hero-agency.png";
            secondaryImg.style.filter = "none";
            showSnark("Back to reality.");
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

    console.log("%c--- PORTFOLIO ONLINE ---", "color: #e899d2; font-weight: bold; font-size: 16px;");
    console.log("%cThere are 7 sins. And maybe 7 clicks?", "color: #8b0000; font-weight: bold; font-style: italic;");
});
