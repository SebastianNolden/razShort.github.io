Vue.component('my-nav', {
  template:`
  <div class="navWrapper">
    <a class="home button" href="index.html">Home</a>
    <a class="github button" href="https://github.com/razShort/razShort.github.io">Github</a>
    <a href="about_me.html" class="aboutme button">Über mich</a>
    <a href="" class="darkmode button"><i class="uil uil-moon"></i></a>
  </div>`
});




// initialisierung der Vue Instanz - als Letztes ausführen
new Vue({
  el: '.nav'
 });