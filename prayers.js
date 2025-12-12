function renderPrayers(container) {
    // Check if a specific day is selected in the state or local variable
    // For simplicity, we'll store selectedDay in a global variable or handle navigation within this view
    if (!window.selectedPrayerDay) {
        renderPrayerGrid(container);
    } else {
        renderPrayerDay(container, window.selectedPrayerDay);
    }
}

function renderPrayerGrid(container) {
    // Header
    const header = document.createElement('div');
    header.className = 'p-4 flex items-center gap-4';
    header.innerHTML = `
        <i class="fas fa-arrow-right" onclick="navigate('home')" style="cursor:pointer; font-size:1.2rem;"></i>
        <h2>${langManager.t('mid_title') || '30 ' + langManager.t('day')}</h2> 
    `;
    container.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'p-4';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
    grid.style.gap = '10px';

    const today = new Date().toISOString().split('T')[0];

    // Generate 30 days starting from... let's say static 1-30 for the challenge
    // Or map to actual dates? The prompt says "30 day challenge".
    // Let's implement it as Days 1-30 relative to start or just 1-30.
    // Better: Map Day 1 to a specific start date if we want tracking, 
    // but for "Challenge" usually Day 1, Day 2 is better.
    // Let's use simple Day 1-30.

    // To enable tracking, we map Day X to a key "day-X".

    for (let i = 1; i <= 30; i++) {
        const dayKey = `day-${i}`;
        const dayData = stateManager.state.prayers[dayKey];

        // Calculate completion
        let isCompleted = false;
        if (dayData) {
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
            isCompleted = prayers.every(p => dayData[p]);
        }

        const btn = document.createElement('div');
        btn.className = `card flex justify-center items-center`;
        btn.style.padding = '10px';
        btn.style.marginBottom = '0';
        btn.style.aspectRatio = '1/1';
        btn.style.cursor = 'pointer';

        if (isCompleted) {
            btn.style.backgroundColor = 'var(--primary-color)';
            btn.style.color = 'white';
        } else if (dayData) {
            // Partially started
            btn.style.border = '2px solid var(--primary-color)';
        }

        btn.onclick = () => {
            window.selectedPrayerDay = i;
            navigate('prayers'); // Re-render to show day view
        };

        btn.innerHTML = `<strong>${i}</strong>`;
        grid.appendChild(btn);
    }

    container.appendChild(grid);
}

function renderPrayerDay(container, dayNumber) {
    const dayKey = `day-${dayNumber}`;
    const dayData = stateManager.getPrayers(dayKey);
    const prayerNames = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

    // Header
    container.innerHTML = `
        <div class="p-4 flex items-center gap-4">
            <i class="fas fa-arrow-right" onclick="window.selectedPrayerDay = null; navigate('prayers')" style="cursor:pointer; font-size:1.2rem;"></i>
            <h2>${langManager.t('day')} ${dayNumber}</h2>
        </div>
    `;

    // Advice Card (Placeholder)
    const advice = document.createElement('div');
    advice.className = 'card m-4';
    advice.style.backgroundColor = '#fff3cd'; // Light yellow
    advice.style.color = '#856404';
    advice.innerHTML = `<i class="fas fa-lightbulb"></i> <small>Tip: Prayer is the pillar of religion.</small>`;
    container.appendChild(advice);

    // Prayer List
    const list = document.createElement('div');
    list.className = 'p-4 flex-col gap-4 flex';

    prayerNames.forEach(p => {
        const isDone = dayData[p];
        const item = document.createElement('div');
        item.className = 'card flex justify-between items-center fade-in';
        item.style.backgroundColor = isDone ? 'var(--primary-light)' : 'var(--surface-color)';
        item.style.color = isDone ? 'white' : 'var(--text-color)';
        item.onclick = () => {
            stateManager.togglePrayer(dayKey, p);
            navigate('prayers'); // Re-render to show update
            checkDailyCompletion(dayKey);
        };

        item.innerHTML = `
            <div class="flex items-center gap-4">
                <i class="far ${isDone ? 'fa-check-circle' : 'fa-circle'}"></i>
                <h3>${langManager.t(p)}</h3>
            </div>
            <span>${isDone ? '+10 XP' : ''}</span>
        `;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function checkDailyCompletion(dayKey) {
    const data = stateManager.getPrayers(dayKey);
    const allDone = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].every(p => data[p]);
    if (allDone) {
        // Show celebration or toast
        // ideally we check if it wasn't done before to avoid spamming
        // but for now simple alert/log is fine, or visually handled by button states
        // alert("MashaAllah! Day Completed!");
    }
}
