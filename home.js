document.addEventListener("DOMContentLoaded", function () {
    // Initial values for goals and current progress
    let stepsGoal = 10000, caloriesBurnedGoal = 2000;
    let steps = 0, caloriesBurned = 0;

    function drawDonutChart(id, value, maxValue, labelId) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw full circle (grey background) representing the max value
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, 2 * Math.PI);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Draw progress arc based on the current value up to the max value (goal)
        const limitedValue = Math.min(value, maxValue);
        const angle = (limitedValue / maxValue) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 80, -Math.PI / 2, angle - Math.PI / 2, false);
        ctx.strokeStyle = '#00455C';
        ctx.lineWidth = 20;
        ctx.stroke();

        // Update the text values inside the donut
        const labelDiv = document.getElementById(labelId);
        labelDiv.querySelector('.numerator').textContent = `${value}`;
        labelDiv.querySelector('.denominator').textContent = `/ ${maxValue}`;
    }

    function updateCharts() {
        drawDonutChart('stepsChart', steps, stepsGoal, 'stepsLabel');
        drawDonutChart('caloriesBurnedChart', caloriesBurned, caloriesBurnedGoal, 'caloriesBurnedLabel');
    }

    // Initialize the charts with progress bars empty
    updateCharts();

    // Prevent the form from submitting and refreshing the page
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        // Get user input values for goals
        stepsGoal = parseInt(document.getElementById("stepsGoal").value) || stepsGoal;
        caloriesBurnedGoal = parseInt(document.getElementById("caloriesBurnedGoal").value) || caloriesBurnedGoal;

        // Reset the steps and calories burned values to start from 0
        steps = 0;
        caloriesBurned = 0;

        // Update the charts to show the user goals with empty progress
        updateCharts();
    });

    // Event listeners for buttons to increment values
    document.getElementById("addSteps").addEventListener("click", function () {
        steps += 500; // Increment steps by 500
        updateCharts(); // Update the charts with current values (progress arc)
    });

    document.getElementById("addCaloriesBurned").addEventListener("click", function () {
        caloriesBurned += 100; // Increment calories burned by 100
        updateCharts(); // Update the charts with current values (progress arc)
    });
});