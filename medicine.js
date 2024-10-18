const medicineForm = document.getElementById('medicine-form');
const medicineNameInput = document.getElementById('medicine-name');
const dosageInput = document.getElementById('dosage');
const frequencyInput = document.getElementById('frequency');
const medicineList = document.getElementById('medicine-list');
const timeList = document.getElementById('time-list');
const dosageUnitSelect = document.getElementById('dosage-units');
const medicineType = document.getElementById('medicine-type');

// Medicine list array
let medicines = [];

function attachAddTimeListener() {
    const addTimeBtn = document.getElementById('add-time-btn');
    addTimeBtn.replaceWith(addTimeBtn.cloneNode(true));

    document.getElementById('add-time-btn').addEventListener('click', () => {
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.classList.add('time-input');
        timeList.appendChild(timeInput);
    });
}

attachAddTimeListener();

// Function to render medicine list
function renderMedicines() {
    medicineList.innerHTML = ''; // Clear the list
    medicines.forEach((medicine, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="medicine-item">
                <input type="checkbox" id="med-${index}" ${medicine.taken ? 'checked' : ''}>
                <div class="medicine-info">
                    <label for="med-${index}" style="font-size: 15px;">
                        <strong>${medicine.name}</strong>: ${medicine.dosage} ${medicine.dosageUnit}, ${medicine.type}
                    </label>
                    <div class="time-frequency-container">
                        <label for="med-${index}" style="font-size: 15px;">
                            Every ${medicine.frequency} day(s) at
                        </label>
                        <label for="med-${index}" style="font-size: 15px;">
                            ${medicine.times.length > 0 ? medicine.times.join(', ') : 'no specific time'}
                        </label>
                    </div>
                </div>
                <div class="button-container">
                    <button class="edit-btn" onclick="editMedicine(${index})">Edit</button>
                    <button class="remove-btn" onclick="removeMedicine(${index})">Remove</button>
                </div>
            </div>
        `;
        medicineList.appendChild(li);

        // Add event listener for the checkbox
        const checkbox = document.getElementById(`med-${index}`);
        checkbox.addEventListener('change', () => {
            medicine.taken = checkbox.checked; // Update the taken status
        });
    });
}

// Function to add medicine
medicineForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    // Collect all the times entered
    const times = Array.from(document.querySelectorAll('.time-input')).map(input => input.value);

    const medicine = {
        name: medicineNameInput.value,
        type: medicineType.value,
        dosage: dosageInput.value,
        dosageUnit: dosageUnitSelect.value,
        frequency: frequencyInput.value,
        times,
        taken: false // Default taken status
    };

    medicines.push(medicine); // Add medicine to the array
    renderMedicines(); // Re-render the medicine list

    // Clear form inputs
    medicineNameInput.value = '';
    medicineType.value = '';
    dosageInput.value = '';
    frequencyInput.value = '';
    timeList.innerHTML = '';

    // Reattach the "Add Time" button event listener after form reset
    attachAddTimeListener();
});

// Function to remove medicine
function removeMedicine(index) {
    medicines.splice(index, 1); // Remove medicine from the array
    renderMedicines(); // Re-render the medicine list
}

// Function to edit medicine
function editMedicine(index) {
    const medicine = medicines[index];
    medicineNameInput.value = medicine.name;
    dosageInput.value = medicine.dosage;
    dosageUnitSelect.value = medicine.dosageUnit;
    frequencyInput.value = medicine.frequency;

    // Remove medicine after editing
    removeMedicine(index);
}

// Initial rendering
renderMedicines();