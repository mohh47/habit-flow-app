function renderTodo(container) {
    try {
        // Calculate Progress
        const tasks = stateManager.state.tasks || [];
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        // Ultra-Premium Styles
        const styles = `
            <style>
                .todo-page-bg {
                    background: radial-gradient(circle at top right, rgba(46, 139, 87, 0.1), transparent 40%),
                                radial-gradient(circle at bottom left, rgba(218, 165, 32, 0.1), transparent 40%);
                    min-height: 100%;
                }

                .premium-stats-card {
                    background: linear-gradient(135deg, var(--primary-color), #0f3d24);
                    border-radius: 24px;
                    padding: 24px;
                    color: white;
                    box-shadow: 0 20px 40px rgba(46, 139, 87, 0.3);
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .premium-stats-card::before {
                    content: '';
                    position: absolute;
                    top: -50%; right: -20%;
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    border-radius: 50%;
                }

                .progress-ring {
                    width: 70px; height: 70px;
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                }
                .progress-ring svg { transform: rotate(-90deg); width: 100%; height: 100%; }
                .progress-ring circle {
                    fill: transparent;
                    stroke-width: 6;
                    stroke-linecap: round;
                }
                .progress-bg { stroke: rgba(255,255,255,0.2); }
                .progress-val { 
                    stroke: #DAA520; 
                    stroke-dasharray: 188; /* 2 * PI * 30 */
                    stroke-dashoffset: ${188 - (188 * percent) / 100};
                    transition: stroke-dashoffset 1s ease;
                }

                .glass-input-container {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 20px;
                    padding: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    border: 1px solid rgba(255,255,255,0.5);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                    transform: translateZ(0);
                }
                body.dark-mode .glass-input-container {
                    background: rgba(30, 30, 30, 0.6);
                    border-color: rgba(255,255,255,0.1);
                }

                .glass-input {
                    border: none;
                    background: transparent;
                    flex: 1;
                    padding: 12px 16px;
                    font-size: 1rem;
                    color: var(--text-color);
                    font-weight: 500;
                    outline: none;
                }

                .floating-add-btn {
                    background: linear-gradient(135deg, #DAA520, #B8860B);
                    color: white;
                    border: none;
                    width: 48px; height: 48px;
                    border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 20px rgba(218, 165, 32, 0.3);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .floating-add-btn:active { transform: scale(0.9); }
                .floating-add-btn i { transition: transform 0.4s ease; }
                .floating-add-btn:hover i { transform: rotate(90deg); }

                .task-item-premium {
                    background: var(--surface-color);
                    border-radius: 18px;
                    padding: 18px;
                    margin-bottom: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                    border-left: 6px solid var(--primary-color);
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    position: relative;
                    z-index: 1;
                }
                
                .task-item-premium:hover {
                    transform: translateY(-4px) scale(1.01);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
                    z-index: 2;
                }

                .custom-checkbox {
                    width: 26px; height: 26px;
                    border-radius: 8px;
                    border: 2px solid #ddd;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.3s;
                    cursor: pointer;
                    margin-left: 12px;
                }
                .custom-checkbox.checked {
                    background: var(--success-color);
                    border-color: var(--success-color);
                    color: white;
                }

                .task-text {
                    flex: 1;
                    font-weight: 600;
                    font-size: 1.05rem;
                    transition: color 0.3s;
                }

                .delete-action {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    background: rgba(255, 71, 87, 0.1);
                    color: #ff4757;
                    display: flex; align-items: center; justify-content: center;
                    border: none;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: all 0.2s;
                }
                .delete-action:hover { opacity: 1; transform: scale(1.1); background: #ff4757; color: white; }

                /* Done State */
                .task-item-premium.done {
                    background: rgba(255,255,255,0.4);
                    border-left-color: var(--success-color);
                    box-shadow: none;
                }
                .task-item-premium.done .task-text {
                    text-decoration: line-through;
                    color: var(--text-muted);
                    opacity: 0.6;
                }
            </style>
        `;

        container.innerHTML = styles + `
            <div class="todo-page bg-transparent p-4 pb-24 todo-page-bg">
                <!-- Nav -->
                <div class="flex items-center gap-4 mb-6 fade-in cursor-pointer" onclick="navigate('home')">
                    <div style="width:40px; height:40px; background:var(--surface-color); border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-arrow-${langManager.currentLang === 'ar' ? 'right' : 'left'}" style="color:var(--text-color);"></i>
                    </div>
                    <h2 style="font-weight:800; font-size:1.5rem; margin:0;">${langManager.t('to_do')}</h2>
                </div>

                <!-- Stats Card -->
                <div class="premium-stats-card fade-in">
                    <div>
                        <h3 style="margin:0; font-size:1.8rem; font-weight:800;">${stateManager.state.streak || 0}</h3>
                        <p style="margin:0; opacity:0.8; font-size:0.9rem;">${langManager.t('streak')} 🔥</p>
                        <div style="margin-top:8px; font-size:0.8rem; background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:20px; width:fit-content;">
                            ${completed}/${total} ${langManager.t('completed')}
                        </div>
                    </div>
                    <div class="progress-ring">
                        <svg>
                            <circle class="progress-bg" cx="35" cy="35" r="30"></circle>
                            <circle class="progress-val" cx="35" cy="35" r="30"></circle>
                        </svg>
                        <i class="fas fa-check" style="position:absolute; color:#DAA520;"></i>
                    </div>
                </div>

                <!-- Input -->
                <div class="glass-input-container fade-in">
                    <input type="text" id="task-input" class="glass-input" placeholder="${langManager.t('add_task')}...">
                    <button id="add-task-btn" class="floating-add-btn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>

                <!-- List -->
                <div id="task-list" class="flex flex-col">
                    <!-- Tasks Injected -->
                </div>
            </div>
        `;

        // Safe Element Selectors
        const input = container.querySelector('#task-input');
        const addBtn = container.querySelector('#add-task-btn');
        const listContainer = container.querySelector('#task-list');

        if (!input || !addBtn || !listContainer) {
            console.error("Critical: Elements not found in Todo Container");
            return;
        }

        // Add Task Function
        const handleAdd = () => {
            const text = input.value.trim();
            if (!text) return;

            if (!stateManager.state.tasks) stateManager.state.tasks = [];
            stateManager.addTask(text);
            input.value = '';
            // Refresh whole view to update stats
            renderTodo(container);
        };

        addBtn.onclick = handleAdd;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleAdd();
        };

        renderTasks(listContainer);

    } catch (e) {
        console.error("Render Todo Error:", e);
        container.innerHTML = `<div class="p-4 text-center text-danger"><h3>Error</h3><p>${e.message}</p></div>`;
    }
}

function renderTasks(container) {
    if (!stateManager.state.tasks) stateManager.state.tasks = [];
    const tasks = stateManager.state.tasks;

    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `
             <div class="text-center mt-12 fade-in" style="opacity:0.6;">
                <div style="background:var(--surface-color); width:120px; height:120px; border-radius:50%; margin:0 auto 1.5rem; display:flex; align-items:center; justify-content:center; box-shadow: inset 0 0 20px rgba(0,0,0,0.05);">
                    <i class="fas fa-list-ul" style="font-size: 3.5rem; color: var(--text-muted); opacity: 0.5;"></i>
                </div>
                <h3 class="text-muted" style="font-weight:600;">${langManager.t('incomplete')}</h3>
            </div>
        `;
        return;
    }

    // Sort: Incomplete first, then completed
    tasks.sort((a, b) => Number(a.completed) - Number(b.completed));

    tasks.forEach(task => {
        const el = document.createElement('div');
        el.className = `task-item-premium fade-in ${task.completed ? 'done' : ''}`;

        el.innerHTML = `
            <div class="flex items-center" style="flex:1; cursor:pointer;" onclick="toggleTask(${task.id})">
                <div class="custom-checkbox ${task.completed ? 'checked' : ''}">
                    ${task.completed ? '<i class="fas fa-check" style="font-size:0.8rem;"></i>' : ''}
                </div>
                <div class="task-text">${task.text}</div>
            </div>
            <button class="delete-action" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        container.appendChild(el);
    });
}

// Global Handlers
window.toggleTask = (id) => {
    stateManager.toggleTask(id);
    // Re-render
    const list = document.getElementById('task-list');
    if (list) renderTasks(list);
};

window.deleteTask = (id) => {
    if (confirm(langManager.t('delete') + '?')) {
        stateManager.deleteTask(id);
        const list = document.getElementById('task-list');
        if (list) renderTasks(list);
    }
};
