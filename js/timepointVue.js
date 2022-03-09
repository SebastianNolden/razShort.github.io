Vue.component('my-timepoint', {
  props: ["position", "headertext", "contenttext", "year"],
  template:`
  <div :class="pos">
    <div v-html="left"></div>
    <p class="timepointHeader">
      {{headertext}}
    </p>
    <hr>
    <p class="timepointContent">
      {{contenttext}}
    </p>
    <div v-html="right"></div>
  </div>
  `,
  computed: {
    pos: function(){
      if(this.position == "right"){
        return "timePoint timepointright";
      } else {
        return "timePoint timepointleft"
      }      
    },
    left: function(){
      if(this.position == "left"){
        return "";
      } else {
        return `<div class="leftPoint">` + this.year + `</div>`;
      }
    },
    right: function(){
      if(this.position == "right"){
        return "";
      } else {
        return `<div class="rightPoint">` + this.year + `</div>`;
      }
    }
  }
});




// initialisierung der Vue Instanz - als Letztes ausführen
new Vue({
  el: '#timeline'
 });