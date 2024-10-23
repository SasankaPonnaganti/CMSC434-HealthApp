const activityForm = document.getElementById('activity-form');
const activityList = document.getElementById('activity-list');
let activities = [];

activityForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const activityName = document.getElementById('activity-name').value;
    let startTime = document.getElementById('start-time').value;
    let endTime = document.getElementById('end-time').value;

    if (activityName && startTime && endTime) {
        startTime = formatTime(startTime);
        endTime = formatTime(endTime);

        const activity = {
            name: activityName,
            startTime: startTime,
            endTime: endTime,
            completed: false
        };

        activities.push(activity);
        renderActivities();

        // Clear fields after submitting
        document.getElementById('activity-name').value = '';
        document.getElementById('start-time').value = '';
        document.getElementById('end-time').value = '';
    } else {
        alert("Please fill in all fields.");
    }
});

function renderActivities() {
    activityList.innerHTML = '';

    activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${activity.name} (Start: ${activity.startTime}, End: ${activity.endTime})
            <div>
                <button onclick="markComplete(${index})">Complete</button>
                <button onclick="delayActivity(${index})">Delay</button>
            </div>
        `;
        activityList.appendChild(li);
    });
}

function markComplete(index) {
    activities.splice(index, 1); // Remove the activity from the list
    renderActivities();
}

function delayActivity(index) {
    const newStartTime = prompt("Enter a new start time for this activity (e.g., 02:00):");
    if (!newStartTime) return; // Exit if no input for start time

    const startTimePeriod = prompt("Is it AM or PM? (Enter AM or PM):").toUpperCase();
    if (startTimePeriod !== 'AM' && startTimePeriod !== 'PM') {
        alert('Please enter AM or PM correctly.');
        return;
    }

    const newEndTime = prompt("Enter a new end time for this activity (e.g., 03:00):");
    if (!newEndTime) return; // Exit if no input for end time

    const endTimePeriod = prompt("Is it AM or PM? (Enter AM or PM):").toUpperCase();
    if (endTimePeriod !== 'AM' && endTimePeriod !== 'PM') {
        alert('Please enter AM or PM correctly.');
        return;
    }

    // Combine the time and period to format it correctly
    const formattedNewStartTime = formatTimeWithPeriod(newStartTime, startTimePeriod);
    const formattedNewEndTime = formatTimeWithPeriod(newEndTime, endTimePeriod);

    // Update the activity times
    activities[index].startTime = formattedNewStartTime;
    activities[index].endTime = formattedNewEndTime;
    
    renderActivities();
}

// Helper function to format time with AM/PM
function formatTimeWithPeriod(time, period) {
    const date = new Date(`1970-01-01T${time}:00`);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    }).replace("AM", period).replace("PM", period); // Ensure the correct period is applied
}


function checkReminders() {
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    activities.forEach(activity => {
        if (activity.startTime === currentTime && !activity.completed) {
            alert(`Reminder: Time to do ${activity.name}`);
        }
    });
}

// Helper function to format time in 12-hour with AM/PM
function formatTime(time) {
    const date = new Date(`1970-01-01T${time}:00`);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Helper function to format time with AM/PM
function formatTimeWithPeriod(time, period) {
    const date = new Date(`1970-01-01T${time}:00`);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'EST'
    }).replace("AM", period).replace("PM", period); // Ensure the correct period is applied
}

// Check for reminders every every minute
setInterval(checkReminders, 60000);
