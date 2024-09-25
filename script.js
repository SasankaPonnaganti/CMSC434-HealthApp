function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementsByClassName("tablinks")[0].click();

function displayChoices() {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    const selectedDropdown = document.getElementById("dropdown").value;
    document.getElementById("choiceDisplay").innerHTML = `You chose: ${selectedOption} and ${selectedDropdown}`;
}

function newTodo() {
    const todoInput = document.getElementById("todoInput").value;
    if (todoInput === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${todoInput} <button onclick="removeItem(this)">Delete</button>`;
    document.getElementById("todoList").appendChild(li);
    document.getElementById("todoInput").value = "";
}

function removeItem(button) {
    const li = button.parentElement;
    li.remove();
}

function showNotification() {
    document.getElementById("profile-alert").style.display = "block";
}

function hideNotification() {
    document.getElementById("profile-alert").style.display = "none";
}
