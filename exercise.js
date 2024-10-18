let currentWorkout = []; // Array to store the current workout exercises

// Step 2: Show/Hide custom exercise fields based on selection
document.getElementById('exercise-type').addEventListener('change', function () {
    const customExerciseFields = document.getElementById('custom-exercise-fields');
    if (this.value === 'custom') {
        customExerciseFields.style.display = 'block';
    } else {
        customExerciseFields.style.display = 'none';
    }
});

// Ensure custom fields are visible if "Custom Exercise" is the default selection
window.addEventListener('DOMContentLoaded', function () {
    const customExerciseFields = document.getElementById('custom-exercise-fields');
    const exerciseType = document.getElementById('exercise-type').value;

    if (exerciseType === 'custom') {
        customExerciseFields.style.display = 'block'; // Show custom fields if Custom is selected by default
    }
});

// Form submission for exercise selection (proceeds to workout details)
document.getElementById('exercise-selection-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('exercise-selection-form').style.display = 'none';
    document.getElementById('workout-details-form').style.display = 'block';
});

// Add exercise to the current workout
document.getElementById('add-exercise-btn').addEventListener('click', function () {
  const exerciseType = document.getElementById('exercise-type').value;
  const customExerciseName = document.getElementById('custom-exercise-name').value;

  let exercise = exerciseType; // Default to dropdown selection

  // If "Custom Exercise" is selected, use the custom exercise name
  if (exerciseType === 'custom') {
      exercise = `${customExerciseName}`;
  }

  const sets = document.getElementById('sets').value;
  const duration = document.getElementById('duration').value;
  const restTime = document.getElementById('rest-time').value;
  const heartRate = document.getElementById('heart-rate').value;
  const calories = document.getElementById('calories-burned').value;

  // Add exercise details to the current workout array
  currentWorkout.push({
      exercise: exercise,
      sets: sets,
      duration: duration,
      restTime: restTime,
      heartRate: heartRate,
      calories: calories
  });

  // Display the added exercise in the current workout list
  const exerciseList = document.getElementById('exercise-list');
  exerciseList.innerHTML += `
      <li>
          <strong>Exercise: ${exercise}</strong><br>
          Sets: ${sets}, Duration: ${duration || "N/A"} mins, Rest Time: ${restTime || "N/A"} mins<br>
          Heart Rate: ${heartRate || "N/A"} bpm, Calories: ${calories || "N/A"} kcal
      </li>
  `;

  // Reset the form inputs for the next exercise
  document.getElementById('workout-details-form').reset();
  document.getElementById('custom-exercise-name').value = ''; 

  // Hide workout details and return to select exercise
  document.getElementById('workout-details-form').style.display = 'none';
  document.getElementById('exercise-selection-form').style.display = 'block';
});

// Save the entire workout
document.getElementById('save-workout-btn').addEventListener('click', function () {
  if (currentWorkout.length === 0) {
      alert('Please add at least one exercise to the workout.');
      return;
  }

  const workoutHistory = document.getElementById('workout-history');
  
  // Add the entire workout to the workout history
  let workoutDetails = '<li><strong>Workout:</strong><ul>';
  currentWorkout.forEach(exercise => {
      workoutDetails += `
          <li>
              Exercise: ${exercise.exercise}<br>
              Sets: ${exercise.sets}, Duration: ${exercise.duration || "N/A"} mins, Rest Time: ${exercise.restTime || "N/A"} mins<br>
              Heart Rate: ${exercise.heartRate || "N/A"} bpm, Calories: ${exercise.calories || "N/A"} kcal
          </li>
      `;
  });
  workoutDetails += '</ul></li>';
  workoutHistory.innerHTML += workoutDetails;

  // Show the green pop-up for "Congratulations on finishing a workout!"
  const workoutCompletePopup = document.getElementById('workout-complete-popup');
  workoutCompletePopup.style.display = 'block';

  // Hide the pop-up after 2 seconds
  setTimeout(() => {
      workoutCompletePopup.style.display = 'none';
  }, 3500);

  // Clear the current workout and the exercise list
  currentWorkout = [];
  document.getElementById('exercise-list').innerHTML = '';

  // Reset the form inputs
  document.getElementById('workout-details-form').reset();  // Reset form
  document.getElementById('exercise-selection-form').reset();  // Reset the select dropdown
  document.getElementById('custom-exercise-fields').style.display = 'none'; // Hide custom fields

  // Check if "custom" is selected and show the custom exercise fields if necessary
  const exerciseType = document.getElementById('exercise-type').value;
  if (exerciseType === 'custom') {
      document.getElementById('custom-exercise-fields').style.display = 'block';
  } else {
      document.getElementById('custom-exercise-fields').style.display = 'none';
  }

  // Hide workout details and return to select exercise
  document.getElementById('workout-details-form').style.display = 'none';
  document.getElementById('exercise-selection-form').style.display = 'block';
});

// Variables to hold the current week and workout dates
let currentWeekStart = new Date('2024-01-02'); // Starting point: January 1st
const workoutDates = []; // No pre-colored dates on start

// Function to format the date for display
function formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to generate the timeline markers
function generateTimeline(startDate) {
    const timeline = document.querySelector('.timeline');
    const dateElements = document.querySelector('.dates');
    timeline.innerHTML = '';
    dateElements.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const markerDate = new Date(startDate);
        markerDate.setDate(markerDate.getDate() + i);
        const formattedDate = formatDate(markerDate);

        const marker = document.createElement('div');
        marker.classList.add('marker');
        marker.setAttribute('data-date', formattedDate);
        marker.addEventListener('click', () => markWorkout(marker));
        
        // No pre-coloring, only highlight when user clicks
        if (workoutDates.includes(formattedDate)) {
            marker.classList.add('active');
        }

        const dateElement = document.createElement('div');
        dateElement.innerText = formattedDate;

        timeline.appendChild(marker);
        dateElements.appendChild(dateElement);
    }
}

// Function to mark a workout on a specific date
function markWorkout(marker) {
    const selectedDate = marker.getAttribute('data-date');
    if (!workoutDates.includes(selectedDate)) {
        workoutDates.push(selectedDate); // Add to the logged dates
        marker.classList.add('active'); // Highlight marker
    }
}

// Navigate to the previous week
document.getElementById('prev-week').addEventListener('click', () => {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    generateTimeline(currentWeekStart);
});

// Navigate to the next week
document.getElementById('next-week').addEventListener('click', () => {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    generateTimeline(currentWeekStart);
});

// Initialize the timeline for the current week starting from January 1st
generateTimeline(currentWeekStart);