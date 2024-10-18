document.addEventListener("DOMContentLoaded", function () {
    // Initial values for current and goal data
    let stepsGoal = 10000, caloriesBurnedGoal = 2000, caloriesConsumedGoal = 2500;
    let steps = 0, caloriesBurned = 0, caloriesConsumed = 0;

    function drawDonutChart(id, value, maxValue, labelId, showGoal) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw full circle (grey background)
        ctx.beginPath();
        ctx.arc(100, 100, 80, 0, 2 * Math.PI);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Draw progress arc based on the current value (initially 0)
        const angle = (value / maxValue) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(100, 100, 80, -Math.PI / 2, angle - Math.PI / 2, false);
        ctx.strokeStyle = '#00455C';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Display either the current value or the goal in the center of the chart
        const labelDiv = document.getElementById(labelId);
        labelDiv.textContent = showGoal ? `${maxValue}` : `${value}`;
    }

    function updateCharts(showGoals = false) {
        drawDonutChart('stepsChart', steps, stepsGoal, 'stepsLabel', showGoals);
        drawDonutChart('caloriesBurnedChart', caloriesBurned, caloriesBurnedGoal, 'caloriesBurnedLabel', showGoals);
        drawDonutChart('caloriesConsumedChart', caloriesConsumed, caloriesConsumedGoal, 'caloriesConsumedLabel', showGoals);
    }

    // Function to load the calories consumed value from localStorage
    function loadCaloriesConsumed() {
        const storedCalories = localStorage.getItem("caloriesConsumed");
        if (storedCalories) {
            caloriesConsumed = parseInt(storedCalories);
        }
        updateCharts(); // Call without showing goals initially
    }

    loadCaloriesConsumed(); // Load the calories consumed when the page loads

    // Event listener for confirming user goals
    document.getElementById("confirmGoals").addEventListener("click", function () {
        // Get user input values for goals
        stepsGoal = parseInt(document.getElementById("stepsGoal").value) || stepsGoal;
        caloriesBurnedGoal = parseInt(document.getElementById("caloriesBurnedGoal").value) || caloriesBurnedGoal;
        caloriesConsumedGoal = parseInt(document.getElementById("caloriesConsumedGoal").value) || caloriesConsumedGoal;

        // Update charts to reflect the new max values and show the goals in the center of the donuts
        updateCharts(true);
    });

    // Event listeners for buttons to increment values
    document.getElementById("addSteps").addEventListener("click", function () {
        steps = Math.min(steps + 500, stepsGoal); // Increment steps by 500, but do not exceed the goal
        updateCharts(); // Update the charts with current values
    });

    document.getElementById("addCaloriesBurned").addEventListener("click", function () {
        caloriesBurned = Math.min(caloriesBurned + 200, caloriesBurnedGoal); // Increment calories burned by 200, but do not exceed the goal
        updateCharts(); // Update the charts with current values
    });

    // Event listener for the "Log Food" button to increment calories consumed by 100
    document.getElementById("logFoodButton").addEventListener("click", function () {
        caloriesConsumed = Math.min(caloriesConsumed + 100, caloriesConsumedGoal); // Increment calories consumed by 100, but do not exceed the goal
        localStorage.setItem("caloriesConsumed", caloriesConsumed); // Store the new value in localStorage
        updateCharts(); // Update the charts with current values
    });
});
