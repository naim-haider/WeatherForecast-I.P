async function api() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=df77161e8b524dcea26181828240510&q=kolkata&days=5"
  );
  const result = await response.json();
  console.log(result);
}

api();

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
