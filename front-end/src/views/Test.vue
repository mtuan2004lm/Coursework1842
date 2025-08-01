<template>
  <div class="test-form">
    <h2>Translate the word English: <span class="target">{{ currentWord.english }}</span></h2>

    <div v-for="lang in languages" :key="lang.key" class="row">
      <div class="label">
        <img :src="lang.flag" class="flag" />
        <strong>{{ lang.label }}</strong>
      </div>
      <input
        type="text"
        v-model="answers[lang.key]"
        :placeholder="'Enter word...'"
        :disabled="submitted"
      />
      <span v-if="submitted">
        <span v-if="isCorrect(lang.key)" class="correct">✔</span>
        <span v-else class="wrong">✘</span>
      </span>
    </div>

    <div class="buttons">
      <button @click="submitAnswers" v-if="!submitted">Submit</button>
      <button @click="nextWord" v-else>Next Word</button>
      <button @click="resetScore">Reset Score</button>
      <button @click="restartGame">Restart Game</button>
    </div>

    <p class="score">Score: {{ score }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      words: [],
      currentIndex: 0,
      answers: {},
      submitted: false,
      score: 0,
      languages: [
        { key: 'german', label: 'German', flag: 'https://flagcdn.com/w40/de.png' },
        { key: 'vietnamese', label: 'Vietnamese', flag: 'https://flagcdn.com/w40/vn.png' },
        { key: 'france', label: 'French', flag: 'https://flagcdn.com/w40/fr.png' },
        { key: 'spain', label: 'Spanish', flag: 'https://flagcdn.com/w40/es.png' },
      ]
    };
  },
  computed: {
    currentWord() {
      return this.words[this.currentIndex] || {};
    }
  },
  methods: {
    async fetchWords() {
      const res = await axios.get('http://localhost:3000/words');
      this.words = res.data;
      this.shuffleWords();
      this.resetAnswers();
    },
    shuffleWords() {
      this.words.sort(() => Math.random() - 0.5);
      this.currentIndex = 0;
    },
    resetAnswers() {
      this.answers = {};
      this.languages.forEach(lang => {
        this.answers[lang.key] = '';
      });
      this.submitted = false;
    },
    submitAnswers() {
      let correctCount = 0;
      this.languages.forEach(lang => {
        const userAns = this.answers[lang.key].trim().toLowerCase();
        const correctAns = (this.currentWord[lang.key] || '').trim().toLowerCase();
        if (userAns === correctAns) correctCount++;
      });
      this.score += correctCount;
      this.submitted = true;
    },
    isCorrect(langKey) {
      const userAns = this.answers[langKey]?.trim().toLowerCase();
      const correctAns = (this.currentWord[langKey] || '').trim().toLowerCase();
      return userAns === correctAns;
    },
    nextWord() {
      if (this.currentIndex < this.words.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.resetAnswers();
    },
    resetScore() {
      this.score = 0;
    },
    restartGame() {
      this.score = 0;
      this.currentIndex = 0;
      this.shuffleWords();
      this.resetAnswers();
    }
  },
  mounted() {
    this.fetchWords();
  }
};
</script>

<style scoped>
.test-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.label {
  width: 130px;
  display: flex;
  align-items: center;
}
.flag {
  width: 24px;
  margin-right: 8px;
}
input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}
.correct {
  color: green;
  font-weight: bold;
}
.wrong {
  color: red;
  font-weight: bold;
}
.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
button {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background: #218838;
}
.target {
  color: #007bff;
}
.score {
  margin-top: 15px;
  font-weight: bold;
}
</style>
    