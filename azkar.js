const azkarData = {
    morning: [
        { id: 1, text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1, title: "آية الكرسي" },
        { id: 2, text: "قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", count: 3, title: "سورة الإخلاص" },
        { id: 3, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِن شَرِّ مَا خَلَقَ ۞ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۞ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", count: 3, title: "سورة الفلق" },
        { id: 4, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَهِ النَّاسِ ۞ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَ النَّاسِ", count: 3, title: "سورة الناس" },
        { id: 5, text: "أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه ، رَبِّ أَعـوذُ بِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر", count: 1 },
        { id: 6, text: "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور", count: 1 },
        { id: 7, text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُ بِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ", count: 1, title: "سيد الاستغفار" },
        { id: 8, text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً", count: 3 },
        { id: 9, text: "اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أَشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلائِكَتِك ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك", count: 4 },
        { id: 10, text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم", count: 7 },
        { id: 11, text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ", count: 100 },
        { id: 12, text: "لا إلهَ إلاّ اللّهُ وحْـدَهُ لا شَـريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْـد، وهُوَ على كُلّ شَيءٍ قَدير", count: 1 },
        { id: 13, text: "اللّهُـمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد", count: 10 }
    ],
    evening: [
        { id: 14, text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1, title: "آية الكرسي" },
        { id: 15, text: "قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", count: 3, title: "سورة الإخلاص" },
        { id: 16, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِن شَرِّ مَا خَلَقَ ۞ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۞ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", count: 3, title: "سورة الفلق" },
        { id: 17, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَهِ النَّاسِ ۞ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَ النَّاسِ", count: 3, title: "سورة الناس" },
        { id: 18, text: "أَمْسَيْـنا وَأَمْسـى المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَها ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلَةِ وَشَرِّ ما بَعْـدَها ، رَبِّ أَعـوذُ بِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر", count: 1 },
        { id: 19, text: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِير", count: 1 },
        { id: 20, text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُ بِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ", count: 1, title: "سيد الاستغفار" },
        { id: 21, text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً", count: 3 },
        { id: 22, text: "اللّهُـمَّ إِنِّـي أَمْسيتُ أَشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلائِكَتِك ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك", count: 4 },
        { id: 23, text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم", count: 7 }
    ]
};

// Global Helper Definition
window.startAzkarSession = (category) => {
    try {
        window.selectedAzkarCategory = category;
        window.currentAzkarIndex = 0;
        window.currentAzkarCount = 0;
        navigate('azkar');
    } catch (e) {
        alert("Error starting session: " + e.message);
    }
}

function renderAzkar(container) {
    try {
        if (window.selectedAzkarCategory) {
            renderAzkarSession(container, window.selectedAzkarCategory);
            return;
        }

        container.innerHTML = `
            <div class="p-4 flex items-center gap-4">
                <i class="fas fa-arrow-right" onclick="navigate('home')" style="cursor:pointer; font-size:1.2rem;"></i>
                <h2>${langManager.t('azkar')}</h2>
            </div>
            <div class="p-4">
                <div class="card m-4" onclick="window.startAzkarSession('morning')">
                    <div class="flex items-center gap-4">
                        <i class="fas fa-sun" style="color:orange; font-size:2rem;"></i>
                        <h3>${langManager.t('morning_azkar')}</h3>
                    </div>
                </div>
                <div class="card m-4" onclick="window.startAzkarSession('evening')">
                    <div class="flex items-center gap-4">
                        <i class="fas fa-moon" style="color:purple; font-size:2rem;"></i>
                        <h3>${langManager.t('evening_azkar')}</h3>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Render Azkar Error:", error);
        container.innerHTML = `<div class="p-4 text-center"><h3>Error loading Azkar</h3><p>${error.message}</p></div>`;
    }
}

function renderAzkarSession(container, category) {
    try {
        const list = azkarData[category];

        // Safety check if category invalid
        if (!list) {
            console.error("Invalid Category:", category);
            window.selectedAzkarCategory = null;
            navigate('azkar');
            return;
        }

        // Force number types
        window.currentAzkarIndex = Number(window.currentAzkarIndex) || 0;
        window.currentAzkarCount = Number(window.currentAzkarCount) || 0;

        const currentZikr = list[window.currentAzkarIndex];

        // End of session logic
        if (!currentZikr) {
            container.innerHTML = `
                 <div class="p-4 flex flex-col items-center justify-center fade-in" style="height:80vh">
                    <i class="fas fa-check-circle" style="color:var(--success-color); font-size:5rem; margin-bottom:1rem;"></i>
                    <h2>${langManager.t('completed')}</h2>
                    <p class="text-muted text-center m-4">تم بحمد الله</p>
                    <button class="btn mt-4" onclick="window.selectedAzkarCategory=null; window.currentAzkarIndex=0; navigate('azkar')">العودة للأذكار</button>
                </div>
            `;
            return;
        }

        // Define counting logic
        const handleCount = () => {
            const btn = container.querySelector('#counter-btn');
            if (btn) {
                btn.style.transform = "scale(0.95)";
                setTimeout(() => btn.style.transform = "scale(1)", 100);
            }

            window.currentAzkarCount++;

            // Check completion
            if (window.currentAzkarCount >= currentZikr.count) {
                stateManager.addXP(2);
                // Update UI to show full count briefly (e.g. 3/3)
                const countDisplay = container.querySelector('#count-display');
                if (countDisplay) countDisplay.innerHTML = `${currentZikr.count} <span style="font-size:1.5rem; color:var(--text-muted);">/ ${currentZikr.count}</span>`;

                // Small delay before moving to next for satisfaction
                setTimeout(() => {
                    nextZikr();
                }, 250);
            } else {
                // Re-render
                renderAzkarSession(container, category);
            }
        };

        // Improved UI for Readability
        container.innerHTML = `
             <div class="p-4 flex items-center gap-4">
                <i class="fas fa-arrow-right" onclick="window.selectedAzkarCategory=null; navigate('azkar')" style="cursor:pointer; font-size:1.2rem;"></i>
                <h2>${category === 'morning' ? langManager.t('morning_azkar') : langManager.t('evening_azkar')}</h2>
            </div>
            
            <div class="p-4 flex flex-col justify-between" style="min-height: calc(100vh - 80px);">
                
                <div id="zikr-card" class="card w-full text-center flex-col justify-center items-center shadow-lg" 
                     style="flex-grow: 1; display:flex; padding: 2rem; margin-bottom: 2rem; border: 1px solid var(--border-color); overflow-y: auto; cursor: pointer; user-select: none;">
                     
                    ${currentZikr.title ? `<h3 style="color:var(--primary-color); margin-bottom:1rem; text-decoration: underline;">${currentZikr.title}</h3>` : ''}
                    
                    <p style="font-size: 1.4rem; line-height: 2.2; font-weight: 500; color: var(--text-color);">
                        ${currentZikr.text}
                    </p>
                    <p class="text-muted mt-4" style="font-size:0.9rem;">(اضغط في أي مكان للعد)</p>
                </div>
                
                <div class="w-full flex flex-col items-center gap-4" style="margin-bottom: 2rem;">
                     <div id="count-display" style="font-size:2.5rem; font-weight:bold; color: var(--primary-color);">
                        ${window.currentAzkarCount} <span style="font-size:1.5rem; color:var(--text-muted);">/ ${currentZikr.count}</span>
                     </div>
                     
                     <button id="counter-btn" class="btn w-full shadow-md" style="height:120px; font-size:3rem; border-radius:30px; background: var(--primary-color);">
                        <i class="fas fa-fingerprint"></i>
                     </button>
                     
                     <div class="flex gap-4 w-full justify-center">
                        <button class="btn btn-secondary" onclick="resetZikr()" style="flex:1;">
                            <i class="fas fa-redo"></i> إعـادة
                        </button>
                         <button class="btn btn-secondary" onclick="nextZikr()" style="flex:1;">
                            <i class="fas fa-forward"></i> تخطـي
                        </button>
                     </div>
                </div>
            </div>
        `;

        // Attach handlers
        const counterBtn = container.querySelector('#counter-btn');
        if (counterBtn) {
            counterBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent double count if bubble
                handleCount();
            };
        }

        const zikrCard = container.querySelector('#zikr-card');
        if (zikrCard) {
            zikrCard.onclick = () => {
                handleCount();
            };
        }
    } catch (error) {
        console.error("Render Azkar Session Error:", error);
        container.innerHTML = `<div class="p-4 text-center"><h3>Error in Session</h3><p>${error.message}</p><button class="btn" onclick="window.location.reload()">Reload</button></div>`;
    }
}

// Global helpers that call internal logic, attached to window to ensure route access
window.resetZikr = () => {
    // We need to re-render. Since we don't have reference to container easily in global
    // we can re-trigger navigation or use a shared reference if we stored it.
    // Simpler: Just refresh view
    navigate('azkar');
};

window.nextZikr = () => {
    window.currentAzkarIndex++;
    window.currentAzkarCount = 0;
    navigate('azkar');
};
