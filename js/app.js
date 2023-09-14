function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            roundCounter: 0,
            winner: null,
            logMessages: []
        }
    },
    methods: {
        attackToMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackToPlayer();
            this.roundCounter++;
            this.addLogMessage('player', 'attack', attackValue)
        },
        attackToPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttackToMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackToPlayer();
            this.roundCounter++;
            this.addLogMessage('player', 'attack', attackValue)
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 15);
            if (this.playerHealth + healValue > 100 ) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue)
        },
        surrender(){
            this.winner = 'monster';
        },
        startNewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.roundCounter = 0;
            this.winner = null;
            this.logMessages = [];
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })

        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth <= 0) {
               return {
                width: '0%'
               }
            }  
            return {
                width: this.monsterHealth + '%'
            }
        },
        playerBarStyles() {
            if (this.playerHealth <= 0) {
                return {
                    width: '0%'
                }
            } 
            return {
                width: this.playerHealth + '%'
            }
        },
        mayUseSpecialAttack() {
            return this.roundCounter % 3 !== 0
        }

    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <=0) {
                //draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //monster lost
                this.winner = 'player';
            }
        }

    }
});
app.mount('#game');