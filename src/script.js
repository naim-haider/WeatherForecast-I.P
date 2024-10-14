// ---search details--- //
const searchBtn = document.querySelectorAll(".searchBtn");
const currentBtn = document.querySelectorAll(".currentBtn");
const citySearched = document.querySelectorAll(".inputField");

const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menuIcon");
const menuCloseIcon = document.getElementById("menuCloseIcon");

function menuToggle(e) {
  e.name === "menu"
    ? ((e.name = "close"),
      mobileMenu.classList.remove("hidden"),
      mobileMenu.classList.add("block"))
    : ((e.name = "menu"),
      mobileMenu.classList.add("hidden"),
      mobileMenu.classList.remove("block"));
}
