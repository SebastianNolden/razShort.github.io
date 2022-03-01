<template>
  <div>
    <h3>{{title}}</h3>
    <textarea v-model="textValue"></textarea>
    <br>
    <span>Anzahl Buchstaben: {{buchstaben}}</span>
    <span>Anzahl Wörter: {{worte}}</span>
    <span>Anzahl Leerzeichen: {{leerzeichen}}</span>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        textValue: ''
      }
    },
    computed: {
      buchstaben: function(){
        let count = 0;
        this.textValue.split('').forEach((c) => {
          if (c !== " ") {
            count++;
          }
        });
        return count;
      },
      worte: function(){
        
        let split = this.textValue.trim().split(" ");
        let count = 0;
        split.forEach((c) => {
          if (c.length >= 1) {
            count++;
          }
        });

        return count;
      },
      leerzeichen: function(){
        let count = 0;
        this.textValue.split('').forEach((c) => {
          if (c === " ") {
            count++;
          }
        });
        return count;
      }
    }
  }
</script>

<style scoped>

</style>