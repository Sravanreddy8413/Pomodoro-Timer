// Function: updateDisplay()
// Responsibility: Refreshes the DOM to match current timer state
function updateDisplay() {
    const timeDisplay = document.getElementById('time-display');
    const sessionLabel = document.getElementById('session-label');
    const completedCount = document.getElementById('completed-count');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');

    // 1. Format time as MM:SS (e.g. 05:09)
    const formattedMin = String(minutes).padStart(2, '0');
    const formattedSec = String(seconds).padStart(2, '0');
    const timeString = `${formattedMin}:${formattedSec}`;

    // 2. Update UI text elements
    if (timeDisplay) timeDisplay.textContent = timeString;
    if (sessionLabel) sessionLabel.textContent = `${currentSession} Session`;
    if (completedCount) completedCount.textContent = completedSessions;

    // 3. Update browser tab title
    document.title = `(${timeString}) - Pomodoro Timer`;

    // 4. Manage button toggle state (Start / Pause / Resume)
    if (startBtn && pauseBtn) {
        if (isRunning) {
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        } else if (isPaused) {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            startBtn.textContent = 'Resume';
        } else {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            startBtn.textContent = 'Start';
        }
    }
} 

// Updates the Start button text and controls based on current state
function updateDisplay() {
    const timeDisplay = document.getElementById('time-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');

    // Format display string
    const formattedMin = String(minutes).padStart(2, '0');
    const formattedSec = String(seconds).padStart(2, '0');
    if (timeDisplay) timeDisplay.textContent = `${formattedMin}:${formattedSec}`;

    // Step 8 & 9 UI Updates: Start -> Pause -> Resume
    if (startBtn) {
        if (isRunning) {
            startBtn.textContent = 'Pause';
            startBtn.classList.add('paused-state');
        } else if (isPaused) {
            startBtn.textContent = 'Resume';
            startBtn.classList.remove('paused-state');
        } else {
            startBtn.textContent = 'Start';
            startBtn.classList.remove('paused-state');
        }
    }

    // If using a separate Pause button:
    if (pauseBtn) {
        pauseBtn.disabled = !isRunning;
    }
} 

// Step 17: Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.textContent = isDark ? '☀️' : '🌙';

    // Save active theme to storage
    const currentSettings = loadSettingsFromStorage() || { workTime: 25, shortBreak: 5, longBreak: 15 };
    saveSettingsToStorage(currentSettings.workTime, currentSettings.shortBreak, currentSettings.longBreak, isDark ? 'dark' : 'light');
}

// Step 18: Optional Feature - Desktop Notification
function sendDesktopNotification(message) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pomodoro Timer", { body: message, icon: "assets/icon.png" });
    }
} 
