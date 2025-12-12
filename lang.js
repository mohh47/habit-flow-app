const translations = {
    ar: {
        app_name: "توكل على الله",
        welcome: "أهلاً بك يا بطل!",
        xp: "نقاط الخبرة",
        streak: "أيام متتالية",
        day: "يوم",
        prayers: "الصلاة",
        study: "الدراسة",
        azkar: "الأذكار",
        to_do: "المهام",
        profile: "الملف الشخصي",
        calendar: "التقويم",
        settings: "الإعدادات",
        home: "الرئيسية",
        fajr: "الفجر",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء",
        completed: "مكتمل",
        incomplete: "غير مكتمل",
        focus_mode: "وضع التركيز",
        start_session: "بدء الجلسة",
        pomodoro: "بومودورو",
        full_session: "جلسة كاملة",
        reset_progress: "إعادة ضبط التقدم",
        theme: "المظهر",
        language: "اللغة",
        morning_azkar: "أذكار الصباح",
        evening_azkar: "أذكار المساء",
        add_task: "إضافة مهمة",
        delete: "حذف",
        save: "حفظ",
        cancel: "إلغاء",
        warning_reset: "هل أنت متأكد؟ سيتم حذف جميع بياناتك.",
        level: "المستوى"
    },
    en: {
        app_name: "Tawakkal",
        welcome: "Welcome Hero!",
        xp: "XP",
        streak: "Streak",
        day: "Day",
        prayers: "Prayers",
        study: "Study",
        azkar: "Azkar",
        to_do: "To-Do",
        profile: "Profile",
        calendar: "Calendar",
        settings: "Settings",
        home: "Home",
        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        completed: "Completed",
        incomplete: "Incomplete",
        focus_mode: "Focus Mode",
        start_session: "Start Session",
        pomodoro: "Pomodoro",
        full_session: "Full Session",
        reset_progress: "Reset Progress",
        theme: "Theme",
        language: "Language",
        morning_azkar: "Morning Azkar",
        evening_azkar: "Evening Azkar",
        add_task: "Add Task",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        warning_reset: "Are you sure? All data will be lost.",
        level: "Level"
    },
    fr: {
        app_name: "Tawakkal",
        welcome: "Bienvenue Héros!",
        xp: "XP",
        streak: "Série",
        day: "Jour",
        prayers: "Prières",
        study: "Étude",
        azkar: "Azkar",
        to_do: "Tâches",
        profile: "Profil",
        calendar: "Calendrier",
        settings: "Paramètres",
        home: "Accueil",
        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        completed: "Terminé",
        incomplete: "Incomplet",
        focus_mode: "Mode Focus",
        start_session: "Commencer",
        pomodoro: "Pomodoro",
        full_session: "Session Complète",
        reset_progress: "Réinitialiser",
        theme: "Thème",
        language: "Langue",
        morning_azkar: "Azkar Matin",
        evening_azkar: "Azkar Soir",
        add_task: "Ajouter",
        delete: "Supprimer",
        save: "Sauvegarder",
        cancel: "Annuler",
        warning_reset: "Êtes-vous sûr? Toutes les données seront perdues.",
        level: "Niveau"
    }
};

class LangManager {
    constructor() {
        this.currentLang = localStorage.getItem('appLang') || 'ar';
        this.updateDocumentDir();
    }

    setLanguage(lang) {
        if (!translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('appLang', lang);
        this.updateDocumentDir();
        location.reload(); // Simple reload to apply changes everywhere
    }

    t(key) {
        return translations[this.currentLang][key] || key;
    }

    updateDocumentDir() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }
}

const langManager = new LangManager();
