function renderStudy(container) {
    if (window.studyModeActive) {
        renderFocusTimer(container);
    } else if (window.selectedStudyDay) {
        renderStudyDay(container, window.selectedStudyDay);
    } else {
        renderStudyGrid(container);
    }
}

function renderStudyGrid(container) {
    // Header
    const header = document.createElement('div');
    header.className = 'p-4 flex items-center gap-4';
    header.innerHTML = `
        <i class="fas fa-arrow-right" onclick="navigate('home')" style="cursor:pointer; font-size:1.2rem;"></i>
        <h2>Study Challenge</h2> 
    `;
    container.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'p-4';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
    grid.style.gap = '10px';

    for (let i = 1; i <= 30; i++) {
        const btn = document.createElement('div');
        btn.className = `card flex justify-center items-center`;
        btn.style.padding = '10px';
        btn.style.marginBottom = '0';
        btn.style.aspectRatio = '1/1';
        btn.style.cursor = 'pointer';
        btn.onclick = () => {
            window.selectedStudyDay = i;
            navigate('study');
        };
        btn.innerHTML = `<strong>${i}</strong>`;
        grid.appendChild(btn);
    }
    container.appendChild(grid);
}

function renderStudyDay(container, day) {
    container.innerHTML = `
        <div class="p-4 flex items-center gap-4">
            <i class="fas fa-arrow-right" onclick="window.selectedStudyDay = null; navigate('study')" style="cursor:pointer; font-size:1.2rem;"></i>
            <h2>Day ${day} Sessions</h2>
        </div>
    `;

    const sessions = [1, 2];
    sessions.forEach(s => {
        const card = document.createElement('div');
        card.className = 'card m-4 flex justify-between items-center';
        card.style.cursor = 'pointer';

        // Check if completed (need to implement persistence for study later, just UI for now)
        // const isDone = stateManager.state.studySessions.includes(\`day-\${day}-session-\${s}\`);

        card.onclick = () => {
            // Confirm removal requested by user - Start Immediately
            window.studyModeActive = true;
            window.currentSessionType = null; // Selection next
            navigate('study');
        };

        card.innerHTML = `
            <div>
                <h3>Session ${s}</h3>
                <span class="text-muted">Tap to start (Blocker enabled)</span>
            </div>
            <i class="fas fa-play-circle" style="color:var(--primary-color); font-size:2rem;"></i>
        `;
        container.appendChild(card);
    });
}

function renderFocusTimer(container) {
    // If type not selected, show selection
    if (!window.currentSessionType) {
        container.innerHTML = `<div class="p-4">
            <h2>Select Mode</h2>
            <div class="card m-4" onclick="startTimer('pomo')">
                <h3>Pomodoro 🍅</h3>
                <p>25m Work / 5m Break (x5)</p>
            </div>
            <div class="card m-4" onclick="startTimer('full')">
                 <h3>Full Session ⏱</h3>
                <p>60m Work / 10m Break (x2)</p>
            </div>
             <button class="btn btn-secondary m-4" onclick="window.studyModeActive=false; navigate('study')">Cancel</button>
        </div>`;

        window.startTimer = (type) => {
            window.currentSessionType = type;
            renderFocusTimer(container); // Re-render with timer
        };
        return;
    }

    // Timer UI
    container.style.height = '100vh';
    container.style.width = '100vw'; // Ensure full width
    container.style.backgroundColor = '#000000'; // Pure black
    container.style.color = '#ffffff';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '99999'; // Higher z-index

    // Timer Logic
    let duration = window.currentSessionType === 'pomo' ? 25 * 60 : 60 * 60;

    container.innerHTML = `
        <div style="text-align: center; width: 100%;">
            <h1 style="font-size:5rem; font-family:monospace; margin-bottom: 20px; font-weight: bold;" id="timer-display">
                ${Math.floor(duration / 60).toString().padStart(2, '0')}:00
            </h1>
            <h3 id="timer-status" style="font-size: 2rem; margin-bottom: 10px; color: var(--primary-color);">FOCUS</h3>
            <p class="text-muted mb-5" style="font-size: 1.2rem;">Do not leave the app</p>
            <button class="btn btn-danger" style="font-size: 1.2rem; padding: 15px 40px; border-radius: 30px;" onclick="exitFocus()">Give Up</button>
        </div>
    `;

    const display = document.getElementById('timer-display');
    const status = document.getElementById('timer-status');

    if (window.timerInterval) clearInterval(window.timerInterval);

    window.timerInterval = setInterval(() => {
        duration--;
        const m = Math.floor(duration / 60).toString().padStart(2, '0');
        const s = (duration % 60).toString().padStart(2, '0');
        display.innerText = `${m}:${s}`;

        if (duration <= 0) {
            clearInterval(window.timerInterval);
            status.innerText = "DONE!";
            stateManager.addXP(50); // Reward
            setTimeout(() => {
                alert("Session Complete! +50 XP");
                exitFocus();
            }, 1000);
        }
    }, 1000); // Speed up x1 for real usage, change 1000 to 10 for testing

    window.exitFocus = () => {
        clearInterval(window.timerInterval);
        window.studyModeActive = false;
        window.currentSessionType = null;
        navigate('study');
    };
}
