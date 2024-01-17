Vue.component('my-nav', {
  template:`
  <div class="navWrapper">
    <div class="name-container">
      <div class="author-name">Sebastian Nolden</div>
      <div class="job-title">Game Programmer</div>
    </div>
    <div class="links-container">
      <a class="image-button" href="https://github.com/razShort/razShort.github.io"><i class="uil uil-github"></i></a>
      <a class="image-button" href="https://www.linkedin.com/in/sebastian-nolden-93306129a/"><i class="uil uil-linkedin"></i></a>
      <a class="button" target="_blank" href="resources/CV_Sebastian_Nolden_english.pdf">Resume</a>
      <a class="darkmode button" href=""><i class="uil uil-moon"></i></a>
    </div>
  </div>`
});




// initialisierung der Vue Instanz - als Letztes ausführen
new Vue({
  el: '.nav'
 });