class AuthManager {
    constructor() {
        this.user = null;
        this.init();
    }

    init() {
        if (!auth) return;
        auth.onAuthStateChanged(user => {
            this.user = user;
            if (user) {
                console.log("User logged in:", user.displayName);
                this.syncData();
                this.updateProfileUI(user);
            } else {
                console.log("User logged out");
                this.updateProfileUI(null);
            }
        });
    }

    async login() {
        if (typeof firebase === 'undefined') return alert("Firebase SDK not loaded! Check internet connection.");
        if (!auth) return alert("Firebase Auth not initialized! Check console for config errors.");

        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            navigate('profile');
        } catch (error) {
            console.error("Login Failed:", error);
            // Show detailed error to user
            alert(`Login Error:\nCode: ${error.code}\nMessage: ${error.message}`);
        }
    }


    logout() {
        if (!auth) return;
        auth.signOut();
        window.location.reload(); // Simple reload to clear state context visuals
    }

    // Smart Sync: Merge Local and Cloud Data
    async syncData() {
        if (!this.user || !db) return;

        const docRef = db.collection('users').doc(this.user.uid);

        try {
            const doc = await docRef.get();
            if (doc.exists) {
                const cloudData = doc.data();
                // Strategy: Cloud data wins for XP/Streak if higher, strictly merge tasks later?
                // For simplicity: We will trust Cloud data BUT if Local has higher XP, we update cloud.
                // Actually, simplest is: Load Cloud -> Update Local State.

                // Merge Logic:
                const localState = stateManager.state;

                // If cloud has more XP, take it.
                if ((cloudData.xp || 0) > (localState.xp || 0)) {
                    stateManager.state = { ...localState, ...cloudData };
                    stateManager.save();
                    console.log("Synced from Cloud");
                } else {
                    // Local is ahead (or equal), push to cloud
                    this.saveToCloud();
                }
            } else {
                // New user in cloud, save current local data
                this.saveToCloud();
            }

            // Re-render current view to reflect changes
            const currentView = window.currentView || 'home';
            // We can dispatch an event or just let the user navigate
        } catch (e) {
            console.error("Sync Error:", e);
        }
    }

    async saveToCloud() {
        if (!this.user || !db) return;
        try {
            await db.collection('users').doc(this.user.uid).set(stateManager.state, { merge: true });
            console.log("Saved to Cloud");
        } catch (e) {
            console.error("Save to Cloud Error:", e);
        }
    }

    updateProfileUI(user) {
        // Find profile elements and update them if they exist
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        const avatarEl = document.getElementById('profile-avatar');
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (user) {
            if (nameEl) nameEl.textContent = user.displayName;
            if (emailEl) emailEl.textContent = user.email;
            if (avatarEl) avatarEl.src = user.photoURL;
            if (loginBtn) loginBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        } else {
            if (nameEl) nameEl.textContent = 'Guest User';
            if (emailEl) emailEl.textContent = 'Sign in to save progress';
            if (avatarEl) avatarEl.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }
}

const authManager = new AuthManager();

// Auto-save to cloud when state changes (Throttle this in production!)
// Hooking into StateManager would be better, but for now we call saveToCloud manually or on page hide
window.addEventListener('beforeunload', () => {
    authManager.saveToCloud();
});
