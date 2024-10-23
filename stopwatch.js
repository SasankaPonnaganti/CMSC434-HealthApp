let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];
let previousLapTime = 0;

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const display = document.getElementById('stopwatch-display');
const lapList = document.getElementById('lap-list');

// Disable the lap button initially
lapBtn.disabled = true;

// Function to start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 10); // Update every 10ms
        running = true;
        lapBtn.disabled = false; // Enable the lap button when running
    }
}

// Function to stop the stopwatch
function stopStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = new Date().getTime() - startTime;
    lapBtn.disabled = true; // Disable the lap button when stopped
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    previousLapTime = 0;
    lapTimes = [];
    display.textContent = "00:00:00.00";
    lapList.innerHTML = ''; // Clear the lap list
    lapBtn.disabled = true; // Disable the lap button after reset
}

// Function to update the display
function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);

    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds, true)}`;
}

// Function to record a lap
function lapStopwatch() {
    const lapTime = updatedTime - previousLapTime;
    lapTimes.push(lapTime);
    previousLapTime = updatedTime;

    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${formatLapTime(lapTime)}`;
    lapList.appendChild(lapItem);
}

// Function to format lap times
function formatLapTime(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds, true)}`;
}

// Function to format time as two digits (or milliseconds)
function formatTime(time, isMilliseconds = false) {
    if (isMilliseconds && time < 10) {
        return `0${time}`;
    }
    return time < 10 ? `0${time}` : time;
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
