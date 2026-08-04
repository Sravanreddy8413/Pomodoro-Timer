// ==========================================
// 1. STATE VARIABLES DECLARATION
// ==========================================
let minutes = 25;       // Holds remaining minutes
let seconds = 0;        // Holds remaining seconds
let timer = null;       // Stores the interval ID to start/stop the countdown
let isRunning = false;  // Flag to check if the timer is actively ticking
let isPaused = false;   // Flag to check if the timer is currently paused

// Session & Duration Settings
let currentSession = 'Work'; // Tracks 'Work', 'Short Break', or 'Long Break'
let completedSessions = 0;   // Count of finished work sessions

const settings = {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15
};

// ==========================================
// 2. TIMER CORE LOGIC
// ==========================================

// Flow Step 1: Start / Resume Timer
function startTimer() {
    // Prevent starting multiple intervals if already running
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    updateControlButtons();

    // Flow Step 2: Every second execution
    timer = setInterval(() => {
        
        // Check if countdown finishes (Timer reaches 0)
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            timer = null;
            isRunning = false;

            // Flow Step 5: Play sound notification
            playAlarmSound();

            // Flow Step 6: Transition to next session
            handleNextSession();
            return;
        }

        // Flow Step 3: Decrease timer values
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        // Flow Step 4: Update UI display
        updateTimerUI();

    }, 1000);
}

// Pause Timer
function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    timer = null;
    isRunning = false;
    isPaused = true;
    updateControlButtons();
}

// Reset Timer back to current session's default state
function resetTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    
    isRunning = false;
    isPaused = false;

    setSessionDuration();
    updateTimerUI();
    updateControlButtons();
}

// Manage session switching when timer hits 00:00
function handleNextSession() {
    if (currentSession === 'Work') {
        completedSessions++;
        // Switch to Long Break every 4 completed work sessions
        if (completedSessions % 4 === 0) {
            currentSession = 'Long Break';
        } else {
            currentSession = 'Short Break';
        }
    } else {
        currentSession = 'Work';
    }

    setSessionDuration();
    updateTimerUI();
    updateControlButtons();
}

// Set time duration based on active session type
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

// Function: Start Countdown
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    updateDisplay();

    // Loop runs every 1 second (1000ms)
    timer = setInterval(() => {

        // 1. Check if countdown finished (00:00 reached)
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            timer = null;
            isRunning = false;

            playAlarmSound();       // Trigger sound alert
            handleNextSession();    // Switch to next session
            return;
        }

        // 2. Step 6: Countdown Logic
        // Example: 25:00 -> 24:59
        if (seconds === 0) {
            minutes--;       // Subtract 1 minute
            seconds = 59;    // Reset seconds to 59
        } else {
            seconds--;       // Subtract 1 second (e.g., 24:59 -> 24:58)
        }

        // 3. Render updated time to screen
        updateDisplay();

    }, 1000);
} 

// ==========================================
// STATE VARIABLES FOR SESSION SWITCHING
// ==========================================
let currentSession = 'Work'; // Tracks 'Work', 'Short Break', or 'Long Break'
let sessionCount = 0;        // Tracks completed WORK sessions (0 to 4)

// Session Durations (in minutes)
const settings = {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15
};

// ==========================================
// SESSION SWITCHING LOGIC
// ==========================================

/**
 * Handles automatic transition to the next session when timer reaches 00:00
 */
function handleNextSession() {
    if (currentSession === 'Work') {
        sessionCount++; // Increment completed work session count

        // Check if 4 work sessions are completed
        if (sessionCount === 4) {
            currentSession = 'Long Break';
            sessionCount = 0; // Reset count after triggering long break
        } else {
            currentSession = 'Short Break';
        }
    } else {
        // After any break (Short or Long), return to Work session
        currentSession = 'Work';
    }

    // Set time duration for the newly selected session
    setSessionDuration();

    // Refresh visual display and session label
    updateDisplay();
}

/**
 * Sets minutes and seconds based on active currentSession
 */
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

// Configurable Settings Object
const settings = {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15
};

// Function: Update Settings values dynamically
function updateTimerSettings(newWork, newShort, newLong) {
    settings.workTime = newWork;
    settings.shortBreak = newShort;
    settings.longBreak = newLong;

    // Reset current timer to reflect new session duration
    resetTimer();
}

// Function: Set duration based on active session type
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
