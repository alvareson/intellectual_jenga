<template>
  <div class="choice-container">
    <div v-if="questions" class="buttons-row">
      <button
          v-for="(question, index) in questions"
          :key="index"
          class="choice-button"
          :class="{ 'disabled': question.spoken }"
          @click="selectQuestion(index + 1)"
      >
        Question {{ index + 1 }}
      </button>
    </div>

    <div class="choice-footer">
      <button class="back-button" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const questions = ref([])

onMounted(() => {
  const allQuizData = JSON.parse(localStorage.getItem('quizData'))
  if (allQuizData && allQuizData[route.params.category]) {
    questions.value = allQuizData[route.params.category]
    console.log(questions.value)
  }
})

function selectQuestion(questionNumber) {
  const question = questions.value[questionNumber - 1]
  if (question) {
    router.push({
      name: 'question',
      params: { category: route.params.category, questionNumber }
    })
  }
}

function goBack() {
  router.push({ name: 'category' })
}
</script>

<style>
.choice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.buttons-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
}

.choice-button {
  width: calc(50% - 20px);
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  text-align: center;
}

.choice-button.disabled, .choice-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #666;
}

.back-button {
  width: 90%;
  padding: 20px;
  margin: 40px 20px;
  font-size: 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  display: block;
}

@media (min-width: 600px) {
  .choice-button {
    width: calc(50% - 20px);
  }
}
</style>



