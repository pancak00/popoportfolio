document.addEventListener('DOMContentLoaded', () => {
    // Gamification State
    let totalXp = 0;
    let discoveredSkills = new Set();
    const xpCounter = document.getElementById('xp-counter');
    
    // Audio Context for "Level Up" sounds
    const playSound = (freq, type = 'sine', duration = 0.1) => {
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
    };

    const updateXp = (amount) => {
        totalXp += amount;
        const level = Math.floor(totalXp / 500) + 1;
        xpCounter.textContent = `LVL ${level} | XP ${totalXp}`;
        xpCounter.style.transform = 'scale(1.2)';
        setTimeout(() => xpCounter.style.transform = 'scale(1)', 200);
        
        if (totalXp % 500 === 0 && totalXp !== 0) {
            playSound(880, 'square', 0.3); // Level up sound
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

            // Discovery Logic
            if (!discoveredSkills.has(index)) {
                discoveredSkills.add(index);
                card.classList.add('discovered');
                playSound(440 + (index * 20), 'triangle', 0.1);
                
                // Animate the XP bar inside
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

    // Logo click snark
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        showSnark("JUST.ME. Because 'Polymath' sounded too pretentious.");
        playSound(660, 'sine', 0.05);
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

    console.log("%c--- PORTFOLIO GAMIFIED ---", "color: #e899d2; font-weight: bold; font-size: 16px;");
    console.log("%cDiscover all skills to level up!", "color: #f4c542; font-weight: bold;");
});
