var vue = new Vue({
   el: '#app',
   data: {
       playerHealth: 100,
       monsterHealth: 100,
       gameIsRunning: false,
       turns: []
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
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;

            this.turns.unshift({
               isPlayer: true,
               text: 'Player hits Monster for ' + damage
            });

            if (this.checkWin()) {
                return;
            }
           this.monsterAttacks();
        },
        specialAttack: function () {
           this.monsterHealth -= this.calculateDamage(10, 20);
           if (this.checkWin()) {
               return;
           }
           this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttacks();
        },
        giveUp: function () {
            this.initialGame();
        },

        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
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
