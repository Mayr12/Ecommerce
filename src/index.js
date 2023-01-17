import { listProducts } from "./constants.js";
import { loadProducts } from "./products.js";
import { showData } from "./products.js";

loadProducts(listProducts);
showData();


let scrollButton = document.getElementById("scrollFunction");
scrollButton.addEventListener("click", () => {
  scrollFunction();
});

let secondScrollButton = document.getElementById("secondScrollFunction");
secondScrollButton.addEventListener("click", () => {
  scrollFunction();
});

let scrollFunction = () => {
  document.getElementById("sectionScrollWoman").scrollIntoView();
};


// function resposive menu

let responsiveMenu = document.getElementById("functionMenu");
responsiveMenu.addEventListener("click", () => {
  functionMenu();
});

function functionMenu() {
  let x = document.getElementById("optionsMenu");
  if (x.className === "options") {
    x.className += " responsive";
  } else {
    x.className = "options";
  }
}
