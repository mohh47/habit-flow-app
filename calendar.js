let calendarInterval;
let viewYear, viewMonth;

function renderCalendar(container) {
    try {
        if (calendarInterval) clearInterval(calendarInterval);

        const now = new Date();
        if (viewYear === undefined) {
            viewYear = now.getFullYear();
            viewMonth = now.getMonth();
        }

        // Premium Styles Injection
        const styles = `
            <style>
                .cal-premium-header {
                    background: linear-gradient(135deg, var(--primary-color), #1a5e3a);
                    color: white;
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 0 10px 30px rgba(46, 139, 87, 0.3);
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .cal-premium-header::before {
                    content: '';
                    position: absolute;
                    top: -50%; left: -50%; width: 200%; height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
                    animation: rotate 20s linear infinite;
                }
                @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                
                .cal-clock {
                    font-size: 3.5rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    font-family: 'Tajawal', sans-serif; 
                    z-index: 2; position: relative;
                }
                
                .cal-date-display {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    z-index: 2; position: relative;
                    font-weight: 500;
                    margin-top: 0.5rem;
                }
                
                .cal-nav-btn {
                    width: 45px; height: 45px;
                    border-radius: 12px;
                    border: none;
                    background: var(--surface-color);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    color: var(--text-color);
                    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .cal-nav-btn:active { transform: scale(0.9); }
                
                .cal-grid-header {
                    font-weight: 700;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }
                
                .cal-day-cell {
                    background: var(--surface-color);
                    border-radius: 16px;
                    min-height: 85px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                }
                
                .cal-day-cell.today {
                    background: linear-gradient(135deg, #FFD700, #DAA520);
                    color: #fff;
                    box-shadow: 0 8px 20px rgba(218, 165, 32, 0.4);
                    transform: translateY(-2px);
                    border: none;
                }
                
                .cal-day-cell.holiday {
                    border: 1px solid #DAA520;
                    background: rgba(218, 165, 32, 0.05);
                }
                
                .cal-day-cell.holiday::after {
                    content: '★';
                    position: absolute;
                    top: 2px; right: 5px;
                    color: #DAA520;
                    font-size: 0.8rem;
                }

                .greg-num { font-size: 1.4rem; font-weight: 700; line-height: 1; margin-bottom: 4px; }
                .hijri-num { font-size: 0.85rem; opacity: 0.7; font-weight: 500; }
                .holiday-label { 
                    font-size: 0.65rem; 
                    background: rgba(255,255,255,0.9); 
                    color: #B8860B; 
                    padding: 2px 6px; 
                    border-radius: 10px; 
                    margin-top: 4px;
                    font-weight: bold;
                    max-width: 95%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .cal-day-cell.today .holiday-label { color: #DAA520; }
            </style>
        `;

        container.innerHTML = styles + `
            <div class="calendar-page p-4" style="padding-bottom: 90px;">
                <!-- Header & Clock -->
                <div class="cal-premium-header text-center fade-in">
                    <div id="digital-clock" class="cal-clock" dir="ltr">00:00</div>
                    <div id="full-date" class="cal-date-display">--</div>
                </div>

                <!-- Calendar Navigation -->
                <div class="flex justify-between items-center mb-6 fade-in" style="padding: 0 10px;">
                    <button class="cal-nav-btn flex items-center justify-center" id="next-month-btn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    
                    <div class="text-center">
                        <h2 id="gregorian-month" style="color: var(--primary-color); margin:0; font-size: 1.5rem; font-weight: 800;">--</h2>
                        <h4 id="hijri-month" class="text-muted" style="margin:0; font-size: 1rem; font-weight: 500;">--</h4>
                    </div>
                    
                    <button class="cal-nav-btn flex items-center justify-center" id="prev-month-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <!-- Calendar Grid -->
                <div class="calendar-grid fade-in">
                    <!-- Weekdays Header -->
                    <div class="grid cal-grid-header" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center;" id="weekdays-header">
                        <!-- Injected via JS -->
                    </div>
                    <!-- Days -->
                    <div id="days-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;">
                        <!-- Injected via JS -->
                    </div>
                </div>
            </div>
        `;

        updateClock(container);
        calendarInterval = setInterval(() => updateClock(document), 1000);
        // Pass container explicitly for initial render (before attachment to DOM)
        renderCalendarGrid(viewYear, viewMonth, container);

        // Handlers
        const prevBtn = container.querySelector('#prev-month-btn');
        const nextBtn = container.querySelector('#next-month-btn');

        if (prevBtn) prevBtn.onclick = () => {
            viewMonth--;
            if (viewMonth < 0) { viewMonth = 11; viewYear--; }
            renderCalendarGrid(viewYear, viewMonth, container.isConnected ? document : container);
        };

        if (nextBtn) nextBtn.onclick = () => {
            viewMonth++;
            if (viewMonth > 11) { viewMonth = 0; viewYear++; }
            renderCalendarGrid(viewYear, viewMonth, container.isConnected ? document : container);
        };

    } catch (e) {
        console.error("Calendar Render Error:", e);
        container.innerHTML = `<div class="p-4 text-center text-danger"><h3>Error</h3><p>${e.message}</p></div>`;
    }
}

function updateClock(context = document) {
    try {
        const clockEl = context.querySelector('#digital-clock');
        const dateEl = context.querySelector('#full-date');
        if (!clockEl) return;

        const now = new Date();
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Africa/Algiers' };
        try {
            clockEl.innerText = new Intl.DateTimeFormat('en-GB', optionsTime).format(now);
        } catch (e) { clockEl.innerText = now.toLocaleTimeString(); }

        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (dateEl) dateEl.innerText = new Intl.DateTimeFormat(langManager.currentLang || 'ar', optionsDate).format(now);
    } catch (e) { }
}

// Added context parameter to find elements even if not yet in document body
function renderCalendarGrid(year, month, context = document) {
    try {
        // Use querySelector which exists on both Elements and Document
        const grid = context.querySelector('#days-grid');
        const gMonthEl = context.querySelector('#gregorian-month');
        const hMonthEl = context.querySelector('#hijri-month');
        const weekdaysEl = context.querySelector('#weekdays-header');

        if (!grid) {
            // Fallback try document if context failed (rare edge case)
            if (context !== document) return renderCalendarGrid(year, month, document);
            return;
        }

        grid.innerHTML = '';
        weekdaysEl.innerHTML = '';

        // Localized Weekdays
        const arDays = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
        const enDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const frDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        let days = enDays;
        const currentLang = langManager.currentLang || 'ar';
        if (currentLang === 'ar') days = arDays;
        if (currentLang === 'fr') days = frDays;

        days.forEach(d => {
            const el = document.createElement('div');
            el.innerText = d;
            weekdaysEl.appendChild(el);
        });

        // Date Logic
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayIndex = firstDay.getDay();

        // Headers
        const monthNames = new Intl.DateTimeFormat(currentLang, { month: 'long' }).format(firstDay);
        if (gMonthEl) gMonthEl.innerText = `${monthNames} ${year}`;

        try {
            const midMonth = new Date(year, month, 15);
            if (hMonthEl) hMonthEl.innerText = new Intl.DateTimeFormat(currentLang + '-u-ca-islamic-umalqura', { month: 'long', year: 'numeric' }).format(midMonth);
        } catch (e) { if (hMonthEl) hMonthEl.innerText = ""; }

        // Start padding
        for (let i = 0; i < startDayIndex; i++) {
            grid.appendChild(document.createElement('div'));
        }

        const today = new Date();

        for (let d = 1; d <= daysInMonth; d++) {
            const currentDate = new Date(year, month, d);

            let hDay = '-', hMonth = '?';
            try {
                const hFormat = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric' });
                const hParts = hFormat.formatToParts(currentDate);
                hDay = hParts.find(p => p.type === 'day').value;
                hMonth = hParts.find(p => p.type === 'month').value;
            } catch (e) { }

            const isToday = currentDate.getDate() === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

            let isHoliday = false;
            let holidayName = '';

            if (hMonth == '9' && hDay == '1') { isHoliday = true; holidayName = 'رمضان'; }
            if (hMonth == '10' && hDay == '1') { isHoliday = true; holidayName = 'عيد الفطر'; }
            if (hMonth == '12' && hDay == '10') { isHoliday = true; holidayName = 'عيد الأضحى'; }

            const cell = document.createElement('div');
            let classes = 'cal-day-cell';
            if (isToday) classes += ' today';
            if (isHoliday) classes += ' holiday';

            cell.className = classes;

            cell.innerHTML = `
                <span class="greg-num">${d}</span>
                <span class="hijri-num">${hDay}</span>
                ${holidayName ? `<span class="holiday-label">${holidayName}</span>` : ''}
            `;

            grid.appendChild(cell);
        }
    } catch (e) {
        console.error("Grid Error:", e);
    }
}
