function renderProfile(container) {
    const user = (typeof auth !== 'undefined' && auth.currentUser) ? auth.currentUser : null;
    const stats = stateManager.state;

    // Calculations
    const currentXp = stats.xp || 0;
    const level = Math.floor(Math.sqrt(currentXp / 100)) + 1;
    const nextLevelXp = Math.pow(level, 2) * 100;
    const currentLevelBaseXp = Math.pow(level - 1, 2) * 100;
    const progress = Math.max(0, Math.min(100, ((currentXp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100));
    const xpNeeded = nextLevelXp - currentXp;

    container.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

            @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes iconPulse {
                 0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
                 50% { transform: scale(1.1); filter: drop-shadow(0 0 5px rgba(255,255,255,0.5)); }
                 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
            }
            @keyframes spinSlow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes flicker {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(0.95); }
            }
            .motion-page {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradientBG 15s ease infinite;
                min-height: 100vh;
                color: white;
                padding-bottom: 90px;
                font-family: 'Tajawal', sans-serif;
            }
            .motion-card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 24px;
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                animation: slideUp 0.6s ease-out both; 
            }
            .motion-card:hover {
                transform: translateY(-5px) scale(1.02);
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.2);
                border-color: rgba(255, 255, 255, 0.5);
            }
            .icon-animate-fire { animation: flicker 2s infinite ease-in-out; }
            .icon-animate-pulse { animation: iconPulse 3s infinite ease-in-out; }
            .icon-animate-spin { animation: spinSlow 10s linear infinite; }
            
            .avatar-glow {
                animation: float 6s ease-in-out infinite;
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
            }
            .progress-bar-fill {
                transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
                width: 0%;
            }
            .text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        </style>

        <div class="motion-page overflow-x-hidden">
            
            <!-- Header (Medium Size Buttons) -->
            <div class="p-6 flex justify-between items-center relative z-10">
                <button onclick="navigate('home')" class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center hover:bg-white/30 transition ring-1 ring-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] group">
                    <i class="fas fa-chevron-left text-2xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)] icon-animate-pulse group-hover:scale-115 transition-transform"></i>
                </button>
                <div class="text-2xl font-extrabold text-white drop-shadow-md">الملف الشخصي</div>
                <button onclick="navigate('settings')" class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition border border-white/20 group">
                    <i class="fas fa-cog text-xl text-white drop-shadow-md group-hover:animate-spin"></i>
                </button>
            </div>

            <!-- Profile Hero -->
            <div class="flex flex-col items-center text-center mt-2 mb-10 relative z-10">
                <div class="relative mb-6">
                    <div class="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    <img id="profile-image" src="${user ? (user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName + '&background=random') : 'https://ui-avatars.com/api/?name=User&background=random&color=fff'}" 
                         class="avatar-glow w-32 h-32 rounded-full border-4 border-white/60 object-cover relative z-10 shadow-2xl">
                    ${user ? `<div class="absolute bottom-2 right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white/40 z-20 shadow-[0_0_15px_rgba(74,222,128,0.6)]"></div>` : ''}
                </div>
                
                <h1 id="profile-name" class="text-4xl font-black mb-2 text-white drop-shadow-lg motion-card px-8 py-2" style="background:rgba(0,0,0,0.1); border:1px solid rgba(255,255,255,0.1); box-shadow:none; animation-delay: 0.1s;">
                    ${user ? (user.displayName || 'مستخدم') : 'زائر'}
                </h1>
                
                ${!user ? `
                    <button onclick="authManager.login()" class="px-8 py-3 bg-white text-blue-600 rounded-full font-bold shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition flex items-center gap-3 animate-bounce">
                        <i class="fab fa-google"></i> تسجيل الدخول
                    </button>
                ` : `
                    <div class="flex items-center gap-2 text-white font-semibold bg-black/20 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg" id="profile-email">
                        <i class="fas fa-envelope opacity-80"></i> ${user.email}
                    </div>
                `}
            </div>

            <!-- Level & Progress (Centered & Arabic) -->
            <div class="px-6 mb-8 motion-card mx-6 p-6 from-white/10 to-transparent bg-gradient-to-b flex flex-col items-center text-center" style="animation-delay: 0.2s;">
                <div class="mb-2">
                    <span class="text-sm font-bold text-white/90 drop-shadow-sm block mb-1">المستوى الحالي</span>
                    <span class="text-5xl font-black text-white drop-shadow-md icon-animate-pulse">${level}</span>
                </div>
                <div class="h-4 w-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 mt-2 mb-2">
                    <div id="xp-bar" class="progress-bar-fill h-full bg-gradient-to-r from-white to-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style="width: 0%"></div>
                </div>
                <div class="text-xs font-bold text-white/80 tracking-wide drop-shadow-sm">
                    ${Math.floor(currentXp)} / ${nextLevelXp} نقطة
                </div>
            </div>

            <!-- Stats Grid (Arabic) -->
            <div class="grid grid-cols-2 gap-4 px-6 pb-8">
                <!-- Streak -->
                <div class="motion-card p-4 flex flex-col items-center justify-center text-center group min-h-[160px]" style="animation-delay: 0.3s; background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400/80 to-red-500/80 flex items-center justify-center mb-2 shadow-lg transform group-hover:-translate-y-2 transition duration-300 border border-white/20">
                        <i class="fas fa-fire text-white text-xl icon-animate-fire"></i>
                    </div>
                    <div class="counter text-3xl font-black text-white drop-shadow-md leading-tight mb-1" data-target="${stats.streak}">0</div>
                    <div class="text-xs font-bold text-white/90 break-words w-full px-1 leading-normal text-center">التتابع</div>
                </div>

                <!-- Prayers -->
                <div class="motion-card p-4 flex flex-col items-center justify-center text-center group min-h-[160px]" style="animation-delay: 0.4s; background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400/80 to-indigo-500/80 flex items-center justify-center mb-2 shadow-lg transform group-hover:-translate-y-2 transition duration-300 border border-white/20">
                        <i class="fas fa-mosque text-white text-xl icon-animate-pulse"></i>
                    </div>
                    <div class="counter text-3xl font-black text-white drop-shadow-md leading-tight mb-1" data-target="${stats.totalPrayers || 0}">0</div>
                    <div class="text-xs font-bold text-white/90 break-words w-full px-1 leading-normal text-center">الصلوات</div>
                </div>

                <!-- Study -->
                <div class="motion-card p-4 flex flex-col items-center justify-center text-center group min-h-[160px]" style="animation-delay: 0.5s; background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400/80 to-pink-500/80 flex items-center justify-center mb-2 shadow-lg transform group-hover:-translate-y-2 transition duration-300 border border-white/20">
                        <i class="fas fa-book-open text-white text-xl icon-animate-pulse"></i>
                    </div>
                    <div class="counter text-3xl font-black text-white drop-shadow-md leading-tight mb-1" data-target="${stats.completedSessions || 0}">0</div>
                    <div class="text-xs font-bold text-white/90 break-words w-full px-1 leading-normal text-center">المذاكرة</div>
                </div>

                <!-- Tasks -->
                <div class="motion-card p-4 flex flex-col items-center justify-center text-center group min-h-[160px]" style="animation-delay: 0.6s; background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/80 to-teal-500/80 flex items-center justify-center mb-2 shadow-lg transform group-hover:-translate-y-2 transition duration-300 border border-white/20">
                        <i class="fas fa-check text-white text-xl icon-animate-pulse"></i>
                    </div>
                    <div class="counter text-3xl font-black text-white drop-shadow-md leading-tight mb-1" data-target="${(stats.tasks || []).filter(t => t.completed).length}">0</div>
                    <div class="text-xs font-bold text-white/90 break-words w-full px-1 leading-normal text-center">المهام</div>
                </div>
            </div>

             <!-- Logout Action -->
            ${user ? `
            <div class="px-6 relative z-10 pb-8">
                <button onclick="authManager.logout()" class="motion-card w-full py-4 text-white font-bold bg-white/10 border-white/20 hover:bg-red-500/30 hover:border-red-400 flex items-center justify-center gap-2 backdrop-blur-md transition-colors" style="animation-delay: 0.7s;">
                    <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
                </button>
            </div>
            ` : ''}

        </div>
    `;

    // Trigger Animations
    setTimeout(() => {
        const bar = container.querySelector('#xp-bar');
        if (bar) bar.style.width = `${progress}%`;

        const counters = container.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500;
            const increment = target / (duration / 16);
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            if (target > 0) updateCounter();
        });
    }, 100);

    // Auto-refresh listener to fix "Guest" delay
    if (typeof auth !== 'undefined') {
        if (container._authUnsub) container._authUnsub(); // Cleanup previous listener if exists on this container
        container._authUnsub = auth.onAuthStateChanged((u) => {
            const currentName = container.querySelector('#profile-name')?.innerText;
            const isGuest = currentName === 'زائر';
            // Only re-render if state mismatch (e.g. User logged in but UI shows Guest)
            if ((u && isGuest) || (!u && !isGuest)) {
                renderProfile(container);
            }
        });
    }
}
