document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const app = document.getElementById('app');

function initApp() {
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    // Apply initial theme
    applyTheme(stateManager.state.theme);

    // Subscribe to state changes to update UI if needed
    stateManager.subscribe((state) => {
        applyTheme(state.theme);
        // We could re-render parts of the UI here if granular updates are needed
        // For now, views might re-render themselves on interaction
    });

    // Initial Route
    navigate('home');
}

function applyTheme(theme) {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
}

function navigate(view) {
    // Clear app content (or keep nav and clear main container - simpler to clear all for now)
    app.innerHTML = '';

    // Create Main Container (with padding for bottom nav)
    const main = document.createElement('main');
    main.style.paddingBottom = '80px';

    if (view === 'home') renderHome(main);
    else if (view === 'settings') renderSettings(main);
    else if (view === 'prayers') renderPrayers(main); // in prayers.js
    else if (view === 'study') renderStudy(main); // in study.js
    else if (view === 'azkar') renderAzkar(main); // in azkar.js
    else if (view === 'calendar') renderCalendar(main); // in calendar.js
    else if (view === 'todo') renderTodo(main); // in tasks.js
    else if (view === 'profile') renderProfile(main);

    app.appendChild(main);

    // Always render Bottom Nav
    renderBottomNav(view);
}

function renderHome(container) {
    const { xp, streak } = stateManager.state;
    const user = (typeof auth !== 'undefined' && auth.currentUser) ? auth.currentUser : null;

    // Header Section
    const header = document.createElement('header');
    header.className = 'p-4 flex justify-between items-center';
    header.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="relative cursor-pointer" onclick="navigate('profile')">
                <img id="home-profile-img" src="${user ? (user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=2E8B57&color=fff&rounded=true`) : 'https://ui-avatars.com/api/?name=User&background=2E8B57&color=fff&rounded=true'}" 
                     alt="Profile" 
                     style="width:45px; height:45px; border-radius:50%; border:2px solid var(--primary-color);">
                <div id="home-profile-ind" style="position:absolute; bottom:0; right:0; width:12px; height:12px; background:${user ? '#4caf50' : '#ccc'}; border-radius:50%; border:2px solid var(--surface-color);"></div>
            </div>
            <div>
                <h3 style="line-height:1.2; font-size:1.1rem; font-weight:800;">${langManager.t('welcome')}</h3>
                <div id="home-user-name" class="text-muted" style="font-size:0.8rem;">${user ? (user.displayName ? user.displayName.split(' ')[0] : 'User') : langManager.t('guest')}</div>
            </div>
        </div>
        
        <div class="flex items-center gap-2">
            <div class="btn-secondary" style="padding: 0.5rem 0.8rem; border-radius: 12px; font-size: 0.9rem; display:flex; align-items:center;">
                <i class="fas fa-fire" style="color:orange; margin-right:5px;"></i> ${streak}
            </div>
            <div class="btn-secondary" style="width:36px; height:36px; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="navigate('settings')">
                <i class="fas fa-cog"></i>
            </div>
        </div>
    `;
    container.appendChild(header);

    // XP Card
    const xpCard = document.createElement('div');
    xpCard.className = 'card m-4 fade-in';
    xpCard.onclick = () => navigate('profile');
    xpCard.style.cursor = 'pointer';
    xpCard.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <h4 class="text-muted" style="font-size:0.9rem;">${langManager.t('level')} ${Math.floor(xp / 100) + 1}</h4>
            <h2 style="color:var(--primary-color); font-size:1.5rem;">${xp} XP</h2>
        </div>
        <div style="background:var(--bg-color); height:10px; border-radius:5px; overflow:hidden;">
            <div style="width:${(xp % 100)}%; background: linear-gradient(90deg, var(--primary-color), #2ecc71); height:100%; border-radius:5px;"></div>
        </div>
    `;
    container.appendChild(xpCard);

    // Main Actions Grid
    const grid = document.createElement('div');
    grid.className = 'm-4';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = '1fr 1fr';
    grid.style.gap = '1rem';

    // Prayer Button
    const prayerBtn = document.createElement('div');
    prayerBtn.className = 'card flex-col items-center justify-center fade-in';
    prayerBtn.style.textAlign = 'center';
    prayerBtn.style.cursor = 'pointer';
    prayerBtn.onclick = () => navigate('prayers');
    prayerBtn.innerHTML = `
        <div style="width:60px; height:60px; background:rgba(46,139,87,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px;">
            <i class="fas fa-mosque" style="font-size:1.8rem; color:var(--primary-color);"></i>
        </div>
        <h3 style="font-size:1rem;">${langManager.t('prayers')}</h3>
    `;

    // Study Button
    const studyBtn = document.createElement('div');
    studyBtn.className = 'card flex-col items-center justify-center fade-in';
    studyBtn.style.textAlign = 'center';
    studyBtn.style.cursor = 'pointer';
    studyBtn.style.animationDelay = '0.1s';
    studyBtn.onclick = () => navigate('study');
    studyBtn.innerHTML = `
        <div style="width:60px; height:60px; background:rgba(218,165,32,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px;">
            <i class="fas fa-book-open" style="font-size:1.8rem; color:var(--secondary-color);"></i>
        </div>
        <h3 style="font-size:1rem;">${langManager.t('study')}</h3>
    `;

    grid.appendChild(prayerBtn);
    grid.appendChild(studyBtn);
    container.appendChild(grid);

    // Quick Widgets (Azkar & ToDo)
    const widgets = document.createElement('div');
    widgets.className = 'm-4 gap-3 flex-col flex';

    // Azkar Widget
    const azkarWidget = document.createElement('div');
    azkarWidget.className = 'card flex justify-between items-center fade-in';
    azkarWidget.style.cursor = 'pointer';
    azkarWidget.onclick = () => navigate('azkar');
    azkarWidget.innerHTML = `
        <div class="flex items-center gap-4">
            <div style="background:rgba(46,139,87,0.1); padding:10px; border-radius:12px;">
                <i class="fas fa-kaaba" style="color:var(--primary-color); font-size:1.2rem;"></i>
            </div>
            <h3 style="font-size:1rem;">${langManager.t('azkar')}</h3>
        </div>
        <i class="fas fa-chevron-left" style="color:var(--text-muted); font-size:0.8rem;"></i>
    `;

    // ToDo Widget
    const todoWidget = document.createElement('div');
    todoWidget.className = 'card flex justify-between items-center fade-in';
    todoWidget.style.cursor = 'pointer';
    todoWidget.onclick = () => navigate('todo');
    todoWidget.innerHTML = `
        <div class="flex items-center gap-4">
            <div style="background:rgba(218,165,32,0.1); padding:10px; border-radius:12px;">
                <i class="fas fa-list-check" style="color:var(--secondary-color); font-size:1.2rem;"></i>
            </div>
            <h3 style="font-size:1rem;">${langManager.t('to_do')}</h3>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-muted" style="font-size:0.8rem;">${(stateManager.state.tasks || []).filter(t => !t.completed).length} pending</span>
            <i class="fas fa-chevron-left" style="color:var(--text-muted); font-size:0.8rem;"></i>
        </div>
    `;

    widgets.appendChild(azkarWidget);
    widgets.appendChild(todoWidget);
    container.appendChild(widgets);

    // Auto-Update Header on Auth Change (Fixes delay issue)
    if (typeof auth !== 'undefined') {
        if (container._homeAuthUnsub) container._homeAuthUnsub();
        container._homeAuthUnsub = auth.onAuthStateChanged(u => {
            const img = document.getElementById('home-profile-img');
            const name = document.getElementById('home-user-name');
            const ind = document.getElementById('home-profile-ind');

            if (u) {
                if (img) img.src = u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}&background=2E8B57&color=fff&rounded=true`;
                if (name) name.innerText = u.displayName ? u.displayName.split(' ')[0] : 'User';
                if (ind) ind.style.background = '#4caf50';
            }
        });
    }
}

function renderSettings(container) {
    container.innerHTML = `
        <div class="p-4">
            <h2 class="mb-4">${langManager.t('settings')}</h2>
            
            <div class="card fade-in">
                <div class="flex justify-between items-center mb-4">
                    <h3>${langManager.t('theme')}</h3>
                    <button class="btn btn-secondary" onclick="stateManager.toggleTheme()">
                        ${stateManager.state.theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'}
                    </button>
                </div>
                
                <div class="flex justify-between items-center mb-4">
                    <h3>${langManager.t('language')}</h3>
                   <div class="flex gap-2">
                        <button class="btn btn-secondary" onclick="langManager.setLanguage('ar')">عربي</button>
                        <button class="btn btn-secondary" onclick="langManager.setLanguage('en')">EN</button>
                    </div>
                </div>
            </div>

            <div class="card fade-in" style="border: 1px solid var(--danger-color);">
                <button class="btn btn-danger w-full" onclick="if(confirm(langManager.t('warning_reset'))) stateManager.resetAll()">
                    ${langManager.t('reset_progress')}
                </button>
            </div>
        </div>
    `;
}

function renderBottomNav(currentView) {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    const items = [
        { id: 'home', icon: 'fa-home', label: langManager.t('home') },
        { id: 'calendar', icon: 'fa-calendar-alt', label: langManager.t('calendar') },
        { id: 'settings', icon: 'fa-cog', label: langManager.t('settings') }
    ];

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = `nav-item ${currentView === item.id ? 'active' : ''}`;
        el.onclick = () => navigate(item.id);
        el.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <span>${item.label}</span>
        `;
        nav.appendChild(el);
    });

    app.appendChild(nav);
}
