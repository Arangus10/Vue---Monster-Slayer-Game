function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            roundCounter: 0,
            winner: null
        }
    },
    methods: {
        attackToMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackToPlayer();
            this.roundCounter++;
        },
        attackToPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttackToMonster() {
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackToPlayer();
            this.roundCounter++;
        },
        healPlayer() {
            const healValue = getRandomValue(8, 15);
            this.playerHealth += healValue;
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
            } else if (value <= 0) {
                // player lost
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <=0) {
                //draw
            } else if (value <= 0) {
                //monster lost
            }
        }

    }
});
app.mount('#game');