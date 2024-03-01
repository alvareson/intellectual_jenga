<template>
  <div class="question-container">
    <h2>{{ question }}</h2>
    <div v-for="(answer, index) in answers" :key="index" class="answer">
      <button class="answer-button">{{ answer }}</button>
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
import {computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import * as questionData from '../data/questions.js'
import * as answerData from '../data/answers.js'

const router = useRouter()
const route = useRoute()

const question = computed(() => {
  const {category, questionNumber} = route.params
  const questions = questionData[category]
  const questionKey = Object.keys(questions)[questionNumber - 1]
  return questions[questionKey]
})

const answers = computed(() => {
  const {category, questionNumber} = route.params
  const answerKey = `${category}${questionNumber}`
  const answersObj = answerData[answerKey]
  return Object.values(answersObj || {})
})

function goBack() {
  router.push({name: 'choice', params: {category: route.params.category}})
}

function markCheck() {
  console.log("Check")
}

function markUncheck() {
  console.log("Uncheck")
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
  border: 2px solid hsla(160, 100%, 37%, 0.5);
  background-color: #f9f9f9;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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

