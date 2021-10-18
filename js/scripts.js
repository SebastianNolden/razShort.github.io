/*jslint browser:true */
/* --------- VARIABLES ------------- */
var darkmodeButton = document.querySelector(".darkmode");
var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
var currentTheme = localStorage.getItem("theme");
var userChoiseColorMode = prefersDarkScheme.matches ? "dark" : "light";

var darkmodeSymbol = '<i class="uil uil-moon"></i>';
var lightmodeSymbol = '<i class="uil uil-sun"></i>';



/* --------- METHODS ------------- */
// first visite on website
if (currentTheme === null) {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", "dark");
  }
}

var darkmodeHTMLSymbol = lightmodeSymbol;
// activates dark theme if user activated dark mode once
if (currentTheme === "dark") {
  document.body.classList.toggle("dark-theme");
  darkmodeHTMLSymbol = darkmodeSymbol;
}
darkmodeButton.innerHTML = darkmodeHTMLSymbol;

// darkmode Click-listener
darkmodeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  var theme = "light";
  var darkmodeHTMLSymbol = lightmodeSymbol;
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
    darkmodeHTMLSymbol = darkmodeSymbol;
  }
  // changing button symbol
  darkmodeButton.innerHTML = darkmodeHTMLSymbol;
  localStorage.setItem("theme", theme);
});
