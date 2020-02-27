var vue = new Vue({
   el: '#app',
   data: {
       playerHealth: 100,
       monsterHealth: 100,
       gameIsRunning: false
   },

    methods: {
        initial: function(value) {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = value;
        },
       startGame: function () {
            this.initial(true);
       },
       initialGame: function(){
           this.initial(false);
       },

       attack: function () {
            this.monsterHealth -= this.calculateDamage(3, 10);

            if (this.checkWin()) {
                return;
            }

            this.playerHealth -= this.calculateDamage(5, 12);

            this.checkWin();
       },
       specialAttack: function () {

       },
       heal: function () {

       },
       giveUp: function () {

       },
       calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
       },
       checkWin: function () {
           if (this.monsterHealth <= 0) {
               if (confirm('You Won! New Game??')) {
                   this.startGame();
               } else {
                   this.initialGame();
               }
               return true;

           } else if (this.playerHealth <= 0) {
               if (confirm('You Lost! New Game??')) {
                   this.startGame();
               } else {
                   this.initialGame();
               }
               return true;
           }
           return false;
       }

    }


});
