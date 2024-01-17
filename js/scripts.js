/*jslint browser:true */
/* --------- VARIABLES ------------- */
var darkmodeButton = document.querySelector(".darkmode");
var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
var currentTheme = localStorage.getItem("theme");
var userChoiseColorMode = prefersDarkScheme.matches ? "dark" : "light";


/* --------- METHODS ------------- */
// first visite on website
if (currentTheme === null) {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", "dark");
  }
}

// darkmode Click-listener
darkmodeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  var theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});


$(document).scroll(function () {
  var y = document.documentElement.scrollTop;
  if (y > 100){
    $('#home').fadeIn();
  } else {
    $('#home').fadeOut();
  }
});