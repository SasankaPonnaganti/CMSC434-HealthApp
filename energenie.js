function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        age: parseFloat(params.get('age')),
        height: parseFloat(params.get('height')),
        height_units: params.get('height-units'),
        weight: parseFloat(params.get('weight')),
        weight_units: params.get('weight-units'),
        gender: params.get('gender'),
        activity_level: params.get('activity_level')
    };
  }
  
  // Display the form data
  const data = getQueryParams();

  function calculateBMI(weight, weightUnits, height, heightUnits) {
    let bmi;

    // If units are inches convert to meters
    if (heightUnits === 'in') {
        height = height * 0.0254;
    }
  
    // If units are pounds convert to kilograms
    if (weightUnits === 'lbs') {
        weight = weight * 0.453592;
    }
    
    // Calculate BMI
    bmi = weight / (height * height);

    return bmi;
}

// Calculate basal metabolic rate
function calculateBMR(weight, weightUnits, height, heightUnits, age, gender) {
    // Convert height to cm if needed
    if (heightUnits === 'm') {
        height = height * 100;
    }
    else if (heightUnits === 'in') {
        height = height * 2.54;
    }
  
    // If units are pounds convert to kilograms
    if (weightUnits === 'lbs') {
        weight = weight * 0.453592;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }
    else if (gender === 'female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    return bmr;
}

function calculateCaloriesBurned(bmr, activityLevel) {
    let activityMultiplier;

    switch (activityLevel) {
        case 'low':
            activityMultiplier = 1.2;
            break;
        case 'medium':
            activityMultiplier = 1.375;
            break;
        case 'high':
            activityMultiplier = 1.55;
            break;
        default:
            activityMultiplier = 1; // Default multiplier
            break;
    }

    return bmr * activityMultiplier; // Return the total calories burned
}

// Calculate and display the BMI
const bmiValue = calculateBMI(data.weight, data.weight_units, data.height, data.height_units);
const bmrValue = calculateBMR(data.weight, data.weight_units, data.height, data.height_units, data.age, data.gender);
const low_activity = calculateCaloriesBurned(bmrValue, 'low');
const medium_activity = calculateCaloriesBurned(bmrValue, 'medium');
const high_activity = calculateCaloriesBurned(bmrValue, 'high');

document.getElementById('bmi').innerText = `${bmiValue.toFixed(2)}`;
document.getElementById('bmr').innerText = `${bmrValue.toFixed(2)} kcal/day`;
document.getElementById('low_activity').innerText = `${low_activity.toFixed(2)} kcal/day`;
document.getElementById('medium_activity').innerText = `${medium_activity.toFixed(2)} kcal/day`;
document.getElementById('high_activity').innerText = `${high_activity.toFixed(2)} kcal/day`;

let selectedCalories = 0;
// Pull the activity level and BMR from the user data
if (data.activity_level === 'low') {
    selectedCalories = low_activity;
} else if (data.activity_level === 'medium') {
    selectedCalories = medium_activity;
} else if (data.activity_level === 'high') {
    selectedCalories = high_activity;
}

// Update the block with calculated values for calories per day and per week
document.getElementById('calories-per-day').innerText = `${selectedCalories.toFixed(0)}`;
document.getElementById('calories-per-week').innerText = `${(selectedCalories * 7).toFixed(0)}`;

const maxCalorieValue = Math.max(low_activity, medium_activity, high_activity);

// Set bar widths based on calorie values, scaling relative to the max value
document.getElementById('low-bar-value').style.width = `${(low_activity / maxCalorieValue) * 100}%`;
document.getElementById('low-bar-value').innerText = `${low_activity.toFixed(0)} kcal`;

document.getElementById('medium-bar-value').style.width = `${(medium_activity / maxCalorieValue) * 100}%`;
document.getElementById('medium-bar-value').innerText = `${medium_activity.toFixed(0)} kcal`;

document.getElementById('high-bar-value').style.width = `${(high_activity / maxCalorieValue) * 100}%`;
document.getElementById('high-bar-value').innerText = `${high_activity.toFixed(0)} kcal`;