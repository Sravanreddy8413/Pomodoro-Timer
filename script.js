// State Variables
let minutes = 25;
let seconds = 0;
let timer = null;
let isRunning = false;
let isPaused = false;

// Session Tracking
let currentSession = 'Work'; // 'Work', 'Short Break', 'Long Break'
let completedSessions = 0;

// Configurations
const settings = {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15
};

// 1. START
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    updateControlButtons();

    // 2. EVERY SECOND
    timer = setInterval(() => {
        
        // Check if countdown finishes (Timer reaches 0)
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            isRunning = false;

            // 5. PLAY SOUND
            playAlarmSound();

            // 6. NEXT SESSION
            handleNextSession();
            return;
        }

        // 3. DECREASE TIMER
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        // 4. UPDATE UI
        updateTimerUI();

    }, 1000);
}

// Controls: Pause Timer
function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
    isPaused = true;
    updateControlButtons();
}

// Controls: Reset Timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;

    setSessionDuration();
    updateTimerUI();
    updateControlButtons();
}

// Logic for switching to the NEXT SESSION
function handleNextSession() {
    if (currentSession === 'Work') {
        completedSessions++;
        // Switch to Long Break after every 4 work sessions
        if (completedSessions % 4 === 0) {
            currentSession = 'Long Break';
        } else {
            currentSession = 'Short Break';
        }
    } else {
        // Return to Work session after break
        currentSession = 'Work';
    }

    setSessionDuration();
    updateTimerUI();
    updateControlButtons();
}

// Reset time duration based on active session type
function setSessionDuration() {
    if (currentSession === 'Work') {
        minutes = settings.workTime;
    } else if (currentSession === 'Short Break') {
        minutes = settings.shortBreak;
    } else if (currentSession === 'Long Break') {
        minutes = settings.longBreak;
    }
    seconds = 0;
}

// Step 2.1: Track the remaining minutes
let minutes = 25;

// Step 2.2: Track the remaining seconds
let seconds = 0;

// Step 2.3: Store the setInterval instance (used to clear/stop the timer)
let timer = null;

// Step 2.4: Boolean flag to check if countdown is actively running
let isRunning = false;

// Step 2.5: Boolean flag to check if the timer is currently paused
let isPaused = false;

// Start function using the variables
function startTimer() {
    // If it's already running, don't start another interval
    if (isRunning) return;

    isRunning = true;
    isPaused = false;

    // Assign setInterval to the 'timer' variable
    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                // Stop interval when time reaches 00:00
                clearInterval(timer);
                isRunning = false;
                alert("Time is up!");
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        console.log(`${minutes}:${seconds}`);
    }, 1000);
}

// Pause function using the variables
function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer); // Stops interval
    isRunning = false;
    isPaused = true;
} 

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Step 8 & Step 9: Combined Start/Pause/Resume Button Logic
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (!isRunning && !isPaused) {
                // Initial Start: 25:00 -> Start Countdown
                startTimer();
            } else if (isRunning) {
                // Click while running: Pause countdown
                pauseTimer();
            } else if (isPaused) {
                // Click while paused: Resume from where left off
                resumeTimer();
            }
        });
    }

    // Secondary Pause Button (if using separate Start and Pause buttons)
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (isRunning) {
                pauseTimer();
            }
        });
    }

    // Step 10: Reset Button Logic
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetTimer(); // Stops timer and resets back to 25:00
        });
    }

    // Initial display setup
    updateDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page refresh on submit

            // Read numeric values from input fields
            const workVal = parseInt(document.getElementById('work-time').value, 10);
            const shortVal = parseInt(document.getElementById('short-break').value, 10);
            const longVal = parseInt(document.getElementById('long-break').value, 10);

            // Update settings and reset display
            updateTimerSettings(workVal, shortVal, longVal);
        });
    }
}); 

document.addEventListener('DOMContentLoaded', () => {
    // Step 16: Load Stored Settings on Startup
    const saved = loadSettingsFromStorage();
    if (saved) {
        if (saved.theme === 'dark') {
            document.body.classList.add('dark-theme');
            const themeBtn = document.getElementById('theme-toggle-btn');
            if (themeBtn) themeBtn.textContent = '☀️';
        }
        document.getElementById('work-time').value = saved.workTime;
        document.getElementById('short-break').value = saved.shortBreak;
        document.getElementById('long-break').value = saved.longBreak;
        updateTimerSettings(saved.workTime, saved.shortBreak, saved.longBreak);
    }

    // Step 17: Theme Toggle Button Listener
    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleDarkMode);

    // Step 18: Request Notification Permission
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }

    // Step 15: Keyboard Accessibility (Enter & Space triggers)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}); 
