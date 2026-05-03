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

    // --- SE7EN MODE (CHUNGKING EXPRESS PERSONA) ---
    const logo = document.querySelector('.logo');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDesc = document.getElementById('hero-desc');
    const heroImg = document.querySelector('.hero .illustration');
    const secondaryImg = document.querySelector('.secondary .illustration');
    const navLinks = document.querySelectorAll('nav ul li a');
    const skillTreeTitle = document.querySelector('#skills h2');
    const labTitle = document.querySelector('#project-lab h2');
    const contactTitle = document.querySelector('#contact h2');

    let isNoir = false;
    let logoClicks = 0;
    let clickTimer;

    logo.addEventListener('click', () => {
        logoClicks++;
        logo.style.transform = 'scale(0.95)';
        setTimeout(() => logo.style.transform = 'scale(1)', 100);
        playSound(300 + (logoClicks * 100), 'sine', 0.05);

        if (logoClicks === 7) {
            triggerNoir();
            logoClicks = 0;
        }

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { logoClicks = 0; }, 3000);
    });

    const triggerNoir = () => {
        isNoir = !isNoir;
        document.body.classList.toggle('noir-persona');
        
        if (isNoir) {
            // Hero
            heroTitle.innerHTML = "i find<br>things.<br><span style='font-size: 2rem; color: var(--noir-accent);'>探偵</span>";
            heroSubtitle.textContent = "Dreamy city nights. Every data point has a story.";
            heroDesc.textContent = "We share the same city, but different frequencies. In 0.01ms, our orbits crossed. Private investigation in a world of neon haze.";
            heroImg.src = "hero-investigator.png";
            secondaryImg.style.filter = "saturate(2) contrast(1.2) blur(2px)";
            
            // Nav
            navLinks[0].textContent = "INTEL (情報)";
            navLinks[1].textContent = "FILES (ファイル)";
            navLinks[2].textContent = "THE SIGNAL (信号)";
            
            // Section Titles
            skillTreeTitle.innerHTML = "The Case File<br><span style='font-size: 1.5rem; color: var(--noir-accent);'>捜査資料</span>";
            labTitle.innerHTML = "Report Log<br><span style='font-size: 1.5rem; color: var(--noir-magenta);'>報告ログ</span>";
            contactTitle.innerHTML = "THE DROPOFF<br><span style='font-size: 1.5rem; color: var(--noir-accent);'>秘密の連絡</span>";

            showSnark("SE7EN MODE ACTIVATED. PINEAPPLE DREAMS.");
            playSound(330, 'sine', 1.5); // Lighter, airy sound
        } else {
            heroTitle.innerHTML = "i do<br>stuffs.";
            heroSubtitle.textContent = "Developer? Sure. But also other things.";
            heroDesc.textContent = "From building PCs to building backends, and from custom keyboards to custom melodies. I'm essentially a technical swiss-army knife that occasionally needs rebooting.";
            heroImg.src = "hero-agency.png";
            secondaryImg.style.filter = "none";
            
            // Nav
            navLinks[0].textContent = "The Vibe";
            navLinks[1].textContent = "The Stuffs";
            navLinks[2].textContent = "The Signal";

            // Section Titles
            skillTreeTitle.textContent = "The Skill Tree";
            labTitle.textContent = "The Project Lab";
            contactTitle.textContent = "SAY WHATSUP";

            showSnark("Back to the day job.");
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

    console.log("%c--- SE7EN MODE INITIALIZED ---", "color: #00f5d4; font-weight: bold; font-size: 16px;");
});
