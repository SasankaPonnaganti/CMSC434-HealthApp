const medicineForm = document.getElementById('medicine-form');
const medicineNameInput = document.getElementById('medicine-name');
const dosageInput = document.getElementById('dosage');
const frequencyInput = document.getElementById('frequency');
const medicineList = document.getElementById('medicine-list');

// Medicine list array
let medicines = [];

// Function to render medicine list
function renderMedicines() {
    medicineList.innerHTML = ''; // Clear the list
    medicines.forEach((medicine, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="med-${index}" ${medicine.taken ? 'checked' : ''}>
            <label for="med-${index}">${medicine.name} - ${medicine.dosage}, ${medicine.frequency}</label>
            <button onclick="editMedicine(${index})">Edit</button>
            <button onclick="removeMedicine(${index})">Remove</button>
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

    const medicine = {
        name: medicineNameInput.value,
        dosage: dosageInput.value,
        frequency: frequencyInput.value,
        taken: false // Default taken status
    };

    medicines.push(medicine); // Add medicine to the array
    renderMedicines(); // Re-render the medicine list

    // Clear form inputs
    medicineNameInput.value = '';
    dosageInput.value = '';
    frequencyInput.value = '';
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
    frequencyInput.value = medicine.frequency;

    // Remove medicine after editing
    removeMedicine(index);
}

// Initial rendering
renderMedicines();