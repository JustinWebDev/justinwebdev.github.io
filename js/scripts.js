function toggleMenu() {
    console.log(document.getElementById("primaryNav").classList);  //show me the classes assigned to the element
    document.getElementById("primaryNav").classList.toggle("hide");
    document.querySelector("button").classList.toggle("hide");

}