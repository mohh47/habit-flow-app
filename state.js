class StateManager {
    constructor() {
        this.state = this.loadState();
        this.listeners = [];
    }

    get defaultState() {
        return {
            xp: 0,
            streak: 0,
            lastLoginDate: new Date().toDateString(),
            theme: 'light', // or 'dark'
            prayers: {}, // { "YYYY-MM-DD": { fajr: true, ... } }
            studySessions: [], // History of sessions
            tasks: [], // { id, text, completed, date }
            azkarCounts: {} // { "azkar-id": totalCount }
        };
    }

    loadState() {
        const stored = localStorage.getItem('tawakkalData');
        if (stored) {
            return { ...this.defaultState, ...JSON.parse(stored) };
        }
        return this.defaultState;
    }

    save() {
        localStorage.setItem('tawakkalData', JSON.stringify(this.state));
        this.notify();
    }

    notify() {
        this.listeners.forEach(cb => cb(this.state));
    }

    subscribe(callback) {
        this.listeners.push(callback);
        // Initial call
        callback(this.state);
    }

    // Actions
    addXP(amount) {
        this.state.xp += amount;
        this.save();
        // Check for streak update if needed (logic can be refined)
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        this.save();
        return this.state.theme;
    }

    resetAll() {
        this.state = this.defaultState;
        this.save();
        location.reload();
    }

    // Prayer Actions
    togglePrayer(date, prayerName) {
        if (!this.state.prayers[date]) {
            this.state.prayers[date] = {
                fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false
            };
        }

        const wasCompleted = this.state.prayers[date][prayerName];
        this.state.prayers[date][prayerName] = !wasCompleted;

        // Award/Remove XP
        if (!wasCompleted) {
            this.addXP(10); // 10 XP per prayer
        } else {
            this.addXP(-10);
        }

        this.save();
    }

    getPrayers(date) {
        return this.state.prayers[date] || {
            fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false
        };
    }

    // Task Actions
    addTask(text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.state.tasks.push(newTask);
        this.save();
        return newTask;
    }

    toggleTask(taskId) {
        const task = this.state.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            if (task.completed) this.addXP(5); // Reward for completing task
            else this.addXP(-5);
            this.save();
        }
    }

    deleteTask(taskId) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
        this.save();
    }
}

const stateManager = new StateManager();
