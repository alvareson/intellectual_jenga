<template>
  <div class="question-container">
    <h2>{{ questionText }}</h2>
    <div v-for="(answer, index) in answers" :key="index" class="answer">
      <button
        class="answer-button"
        :class="{ 'correct': answer.isItCorrect, 'incorrect': !answer.isItCorrect }"
      >
        {{ answer.title }}
      </button>
    </div>

    <div class="check-buttons">
      <button class="check-button" @click="markCheck">Check</button>
      <button class="check-button" @click="markUncheck">Uncheck</button>
    </div>

    <div class="question-footer">
      <button class="back-button" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const quizData = ref({})

onMounted(() => {
  quizData.value = JSON.parse(localStorage.getItem('quizData') || '{}')
})

const questionText = computed(() => {
  const { category, questionNumber } = route.params
  const categoryQuestions = quizData.value[category] || []
  const questionIndex = parseInt(questionNumber, 10) - 1
  // console.log("categoryQuestions[questionIndex]?.question", categoryQuestions[questionIndex]?.question)
  return categoryQuestions[questionIndex]?.question || "Not found"
})

const answers = computed(() => {
  const { category, questionNumber } = route.params
  const categoryQuestions = quizData.value[category] || []
  const questionIndex = parseInt(questionNumber, 10) - 1
  return categoryQuestions[questionIndex]?.answers || []
})



function goBack() {
  router.push({name: 'choice', params: {category: route.params.category}})
}

function markCheck() {
  const { category, questionNumber } = route.params
  const questionIndex = parseInt(questionNumber, 10) - 1
  const categoryQuestions = quizData.value[category]

  if (categoryQuestions && categoryQuestions.length > questionIndex) {
    categoryQuestions[questionIndex].spoken = true
    localStorage.setItem('quizData', JSON.stringify(quizData.value))
  }
}

function markUncheck() {
  const { category, questionNumber } = route.params
  const questionIndex = parseInt(questionNumber, 10) - 1
  const categoryQuestions = quizData.value[category]

  if (categoryQuestions && categoryQuestions.length > questionIndex) {
    categoryQuestions[questionIndex].spoken = false
    localStorage.setItem('quizData', JSON.stringify(quizData.value))
  }
}
</script>

<style>
.question-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
}

.back-button, .check-button {
  width: 80%;
  padding: 15px;
  margin: 10px auto;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  text-align: center;
}

.check-buttons, .question-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.answer-button {
  width: 80%;
  margin: 10px auto;
  padding: 15px 20px;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.correct {
  border: 2px solid hsla(160, 100%, 37%, 0.5);
}

.incorrect {
  border: 2px solid hsla(354, 97%, 48%, 0.5);
}

.answer-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.check-buttons {
  margin-top: 30px;
}

.question-footer {
  margin-bottom: 30px;
}
</style>

