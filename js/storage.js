// Step 16: Local Storage Management
const STORAGE_KEY = 'pomodoro_settings';

function saveSettingsToStorage(work, short, long, theme) {
    const settingsData = {
        workTime: work,
        shortBreak: short,
        longBreak: long,
        theme: theme
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsData));
}

function loadSettingsFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return null;
}
