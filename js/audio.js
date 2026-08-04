// Step 13: Play Alarm Function using HTML5 Audio
function playAlarmSound() {
    const alarm = document.getElementById('alarm-sound') || new Audio('assets/alarm.mp3');
    alarm.currentTime = 0;
    alarm.play().catch(error => {
        console.warn("Audio playback blocked by browser interaction policy:", error);
    });
}
