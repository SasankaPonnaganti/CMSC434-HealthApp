let currentFood = [];
let presets = {Apple: {grams: 1, cups: 57, teaspoons: false, tablespoons: false, oz: 15, floz: false, wholePieces:95, package: false}, 
Banana: {grams: 1, cups: 200, teaspoons: false, tablespoons: false, oz: 25, floz: false, wholePieces:105, package: false},
CheezItOriginal: {grams: 5, cups: 312, teaspoons: false, tablespoons: false, oz: 70, floz: false, wholePieces: false, package: 150},
Walnuts: {grams: 7, cups: 523, teaspoons: 16, tablespoons: 48, oz: 185, floz: false, wholePieces: false, package: false},
WhiteRice: {grams: 1, cups: 206, teaspoons: 4, tablespoons: 13, oz: 37, floz: false, wholePieces: false, package: false}
}
let units = [
    document.getElementById('grams'),
    document.getElementById('cups'),
    document.getElementById('teaspoons'),
    document.getElementById('tablespoons'),
    document.getElementById('oz'),
    document.getElementById('floz'),
    document.getElementById('wholePieces'),
    document.getElementById('package')
];
let changeHandler1 = function () {
    document.getElementById('serving-size').setAttribute(
        "value", 
        presets[document.getElementById('food-type').value][document.getElementById('unit').value]
    );
    changeHandler2();
};
let changeHandler2 = function () { document.getElementById('calories').setAttribute("value", document.getElementById('serving-size').value * document.getElementById('servings').value) };
document.getElementById('food-type').addEventListener('change', function () {
    const customfoodFields = document.getElementById('custom-food-fields');
    if (this.value === 'custom') {
        customfoodFields.style.display = 'block';
    } else {
        customfoodFields.style.display = 'none';
    }
});
let done = false;

window.addEventListener('DOMContentLoaded', function () {
    const customfoodFields = document.getElementById('custom-food-fields');
    const foodType = document.getElementById('food-type').value;

    if (foodType === 'custom') {
        customfoodFields.style.display = 'block';
    }
});

document.getElementById('food-selection-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('food-selection-form').style.display = 'none';
    const foodType = document.getElementById('food-type').value;

    if (foodType in presets) {
        document.getElementById('serving-size').setAttribute("disabled", true);
        document.getElementById('serving-size').setAttribute("value", presets[foodType]["grams"]); 
        
        for (let i = 0; i < units.length; i++) {
            if (presets[foodType][units[i].id]) {
                units[i].removeAttribute("disabled");
            } else {
                units[i].setAttribute("disabled", true);
            }
        }

        document.getElementById('unit').addEventListener('change', changeHandler1);
        document.getElementById('serving-size').addEventListener('change', changeHandler2);
        document.getElementById('servings').addEventListener('change', changeHandler2);
        
    } else {
        document.getElementById('serving-size').removeAttribute("disabled");
        for (let i = 0; i < units.length; i++) {
            units[i].removeAttribute("disabled");
        }
        document.getElementById('unit').removeEventListener('change', changeHandler1);
        document.getElementById('serving-size').addEventListener('change', changeHandler2);
        document.getElementById('servings').addEventListener('change', changeHandler2);
    }

    document.getElementById('meal-details-form').style.display = 'block';
});

document.getElementById('add-food-btn').addEventListener('click', function () {
  const foodType = document.getElementById('food-type').value;
  const customfoodName = document.getElementById('custom-food-name').value;

  let food = foodType;

  if (foodType === 'custom') {
      food = `${customfoodName}`;
  }

  const servingsize = document.getElementById('serving-size').value;
  const servings = document.getElementById('servings').value;
  const unit = document.getElementById('unit').value;
  const calories = document.getElementById('calories').value;

  currentFood.push({
      food: food,
      servings: servings,
      servingsize: servingsize,
      unit: unit,
      calories: calories
  });

  const foodList = document.getElementById('food-list');
  foodList.innerHTML += `
      <li>
          <strong>${food || "Unknown Food"}</strong><br>
          ${servings || 0} ${document.getElementById(unit).innerHTML}s<br>
          ${calories || 0} Calories
      </li>
  `;

  document.getElementById('meal-details-form').reset();
  document.getElementById('custom-food-name').value = ''; 

  document.getElementById('meal-details-form').style.display = 'none';
  document.getElementById('food-selection-form').style.display = 'block';
});

document.getElementById('save-meal-btn').addEventListener('click', function () {
  if (currentFood.length === 0) {
      alert('Please add at least one food to the meal.');
      return;
  }

  const mealHistory = document.getElementById('meal-history');
  
  let mealDetails = '<li><strong>Meal:</strong><ul>';
  let progress = document.getElementById("calorie-bar");
  currentFood.forEach(food => {
        progress.value = parseInt(progress.value) + parseInt(food.calories);
        document.getElementById("total-calories").innerHTML = progress.value;
      mealDetails += `
      <li>
          <strong>${food.food || "Unknown Food"}</strong><br>
          ${food.servings || 0} ${document.getElementById(food.unit).innerHTML}s<br>
          ${food.calories || 0} Calories
      </li>
      `;
  });
  mealDetails += '</ul></li>';
  mealHistory.innerHTML += mealDetails;

  const mealCompletePopup = document.getElementById('meal-complete-popup');
  if (parseInt(progress.value) >= 1500 && parseInt(progress.value) < 2000) {
    console.log("Hi");
    mealCompletePopup.innerHTML = "Congratulations on finishing a meal! You are close to your calorie goal for the day, keep it up!";
  } else if (parseInt(progress.value) >= 2000 && done == false) {
    done = true;
    mealCompletePopup.innerHTML = "Congratulations on finishing a meal and meeting your calorie goal for the day!";
  } else {
    mealCompletePopup.innerHTML = "Congratulations on finishing a meal!";
  }
  mealCompletePopup.style.display = 'block';

  setTimeout(() => {
      mealCompletePopup.style.display = 'none';
  }, 3000);

  currentmeal = [];
  document.getElementById('food-list').innerHTML = '';
  document.getElementById('meal-details-form').reset();
  document.getElementById('food-selection-form').reset();
  document.getElementById('custom-food-fields').style.display = 'none';
  document.getElementById('meal-details-form').style.display = 'none';
  document.getElementById('food-selection-form').style.display = 'block';
  currentFood = [];
});

// Keyboard functionality
const customFoodNameInput = document.getElementById('custom-food-name-text-entry');
const keyboardImg = document.getElementById('keyboard-img');

if (customFoodNameInput && keyboardImg) {
    customFoodNameInput.addEventListener('focus', function () {
        keyboardImg.style.display = 'block';
    });

    document.addEventListener('click', function (event) {
        const isClickInsideInput = customFoodNameInput.contains(event.target);
        const isClickInsideKeyboard = keyboardImg.contains(event.target);

        if (!isClickInsideInput && !isClickInsideKeyboard) {
            keyboardImg.style.display = 'none';
        }
    });
} else {
    console.error("Element(s) not found: custom-food-name or keyboard-image.");
}
