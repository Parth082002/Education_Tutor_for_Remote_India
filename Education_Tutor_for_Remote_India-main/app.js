/**
 * App.js - Interactivity for VidyaConnect
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Language Data (Mock Implementation)
    const translations = {
        en: {
            hero_badge: "Empowering Rural India",
            hero_title: "Brilliant Minds Deserve <span class='text-primary text-underline'>Brilliant Teachers.</span>",
            hero_subtitle: "Connect with top educators across the country, right from your village. Optimized for low-bandwidth connections so learning never stops.",
            features_title: "Built for Real-World Access"
        },
        hi: {
            hero_badge: "ग्रामीण भारत को सशक्त बनाना",
            hero_title: "मेधावी छात्रों को <span class='text-primary text-underline'>श्रेष्ठ शिक्षक</span> चाहिए।",
            hero_subtitle: "देश भर के शीर्ष शिक्षकों से जुड़ें, सीधे अपने गाँव से। कम बैंडविड्थ के लिए अनुकूलित ताकि सीखना कभी न रुके।",
            features_title: "वास्तविक दुनिया के लिए बनाया गया"
        }
    };

    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            // Only 'en' and 'hi' are fully mocked in this demo
            if (translations[lang]) {
                const dict = translations[lang];
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (dict[key]) {
                        el.innerHTML = dict[key];
                    }
                });
            }
        });
    }

    // 2. Bandwidth Toggle Simulation
    const bandwidthSwitch = document.getElementById('bandwidth-switch');
    const bandwidthStatus = document.getElementById('bandwidth-status');
    const statusIcon = document.querySelector('.bandwidth-toggle i');

    if (bandwidthSwitch) {
        bandwidthSwitch.checked = true; // High by default

        bandwidthSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                // High Bandwidth Mode
                bandwidthStatus.textContent = "High Bandwidth Mode";
                statusIcon.className = "ri-signal-wifi-line indicator-high";
                
                // Simulate UI changes
                document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
                document.querySelector('.hero-img').style.filter = 'none';
                
            } else {
                // Low Bandwidth Mode
                bandwidthStatus.textContent = "Low Bandwidth (Data Saver)";
                statusIcon.className = "ri-signal-wifi-1-line";
                statusIcon.style.color = "var(--warning)";
                
                // Simulate UI changes: remove heavy blur (saves rendering cost), gray out or compress images
                document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.95)');
                // Dim image to simulate lower resolution load
                document.querySelector('.hero-img').style.filter = 'grayscale(20%) contrast(90%) blur(1px)';
            }
        });
    }

    // 3. Mock Tutors Data Generation
    const tutorsData = [
        { name: "Amit Sharma", subject: "Mathematics", grade: "high", lang: "hi", rating: "4.9", reviews: 120, img: "1" },
        { name: "Priya Desai", subject: "Science", grade: "middle", lang: "en", rating: "4.8", reviews: 95, img: "2" },
        { name: "Rahul Verma", subject: "English", grade: "primary", lang: "hi", rating: "5.0", reviews: 200, img: "3" },
        { name: "Sneha Reddy", subject: "Mathematics", grade: "primary", lang: "hi", rating: "4.7", reviews: 84, img: "4" }
    ];

    const tutorResults = document.getElementById('tutor-results');
    
    function renderTutors(tutors) {
        if (!tutorResults) return;
        tutorResults.innerHTML = '';
        
        if (tutors.length === 0) {
            tutorResults.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No tutors found matching your criteria.</p>';
            return;
        }

        tutors.forEach((tutor, index) => {
            // using UI faces unplash source for demo avatars
            const avatarUrl = `https://i.pravatar.cc/150?img=${10 + parseInt(tutor.img)}`;
            
            const card = document.createElement('div');
            card.className = `tutor-card glass-card hover-lift fade-in-up`;
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <img src="${avatarUrl}" alt="${tutor.name}" class="tutor-avatar">
                <h4 class="tutor-name">${tutor.name}</h4>
                <div class="tutor-subject">${tutor.subject} • Grade ${tutor.grade === 'high' ? '9-12' : tutor.grade === 'middle' ? '6-8' : '1-5'}</div>
                <div class="tutor-meta">
                    <span><i class="ri-star-fill"></i> ${tutor.rating} (${tutor.reviews})</span>
                    <span><i class="ri-translate"></i> ${tutor.lang === 'hi' ? 'Hindi' : 'English'}</span>
                </div>
                <button class="btn btn-outline" style="width: 100%;">Book Demo</button>
            `;
            tutorResults.appendChild(card);
        });
    }

    // Initial render
    renderTutors(tutorsData);

    // Filter Logic
    const btnSearch = document.getElementById('btn-search-tutors');
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const subject = document.getElementById('filter-subject').value;
            const grade = document.getElementById('filter-grade').value;
            const lang = document.getElementById('filter-lang').value;
            
            // Add a small loading effect
            btnSearch.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Searching...';
            
            setTimeout(() => {
                const filtered = tutorsData.filter(t => {
                    return (subject === 'all' || t.subject.toLowerCase() === subject) &&
                           (grade === 'all' || t.grade === grade) &&
                           (lang === 'all' || t.lang === lang);
                });
                renderTutors(filtered);
                btnSearch.innerHTML = '<i class="ri-search-line"></i> Search';
            }, 600); // mock network delay
        });
    }

    // Header sticky styling on scroll
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
