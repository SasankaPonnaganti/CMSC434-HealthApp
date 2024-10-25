function filter() {
    let group = document.getElementById("muscle-group").value;
    let equipment = document.getElementById("equipment").value;
    let all = document.getElementsByClassName("any-m");
    for (let i of all) {
        i.style.display = "none";
    }
    let groupElements = Array.from(document.getElementsByClassName(group));
    let equipmentElements = Array.from(document.getElementsByClassName(equipment));
    if (groupElements.filter((element) => equipmentElements.includes(element)).length == 0) {
        document.getElementById("nothing-found").style.display = "block";
    } else {
        for (let i of groupElements.filter((element) => equipmentElements.includes(element))) {
            i.style.display = "block";
        }
        document.getElementById("nothing-found").style.display = "none";
    }
}