function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            roundCounter: 0
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
        }
    },
    computed: {
        monsterBarStyles() {
            return{
                width: this.monsterHealth + '%'
            }
        },
        playerBarStyles() {
            return{
                width: this.playerHealth + '%'
            }
        }

    }
});
app.mount('#game');