<template>
  <div class="choice-container">
    <div class="buttons-row">
      <button
          v-for="n in 12"
          :key="n"
          class="choice-button"
          :class="{ disabled: n > 3 }"
          @click="selectQuestion(n)"
      >
        Question {{ n }}
      </button>
    </div>

    <div class="choice-footer">
      <button class="back-button" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function goBack() {
  router.push({ name: 'category' })
}

function selectQuestion(questionNumber) {
  if (questionNumber <= 3) {
    router.push({
      name: 'question',
      params: { category: route.params.category, questionNumber }
    })
  } else {
    // FOR TEST ONLY
  }
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



