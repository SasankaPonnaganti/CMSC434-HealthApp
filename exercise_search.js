function filter() {
    group = document.getElementById("muscle-group").value;
    for (i of document.getElementsByClassName("any")) {
        i.style.display = "none";
    }
    for (i of document.getElementsByClassName(group)) {
        i.style.display = "block";
    }
}