const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      bossHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    attackBoss() {
      this.currentRound++;

      const attackValue = getRandomValue(5, 12);

      this.bossHealth -= attackValue;

      this.addLogMessage("player", "attack", attackValue);

      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);

      this.playerHealth -= attackValue;

      this.addLogMessage("boss", "attack", attackValue);
    },
    specialAttackBoss() {
      this.currentRound++;

      const attackValue = getRandomValue(10, 25);

      this.bossHealth -= attackValue;

      this.addLogMessage("player", "attack", attackValue);

      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;

      const healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else this.playerHealth += healValue;

      this.addLogMessage("player", "heal", healValue);

      this.attackPlayer();
    },
    restart() {
      this.playerHealth = 100;
      this.bossHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "boss";
    },
    addLogMessage(attacker, action, value) {
      this.logMessages.unshift({
        attacker,
        action,
        value,
      });
    },
  },
  computed: {
    bossBarStyles() {
      if (this.bossHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.bossHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    isButtonDisabled() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.bossHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "boss";
      }
    },
    bossHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.mount("#game");
