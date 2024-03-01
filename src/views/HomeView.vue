<template>
  <div class="home-container">
    <button class="home-button" @click="play">Play</button>
    <button class="home-button" @click="reset">Reset</button>
    <button class="home-button" @click="result">Result</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const play = () => {
  router.push({ name: 'category' })
}

function reset() {
  console.log("Reset clicked")
}

function result() {
  console.log("Result clicked")
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.home-button {
  width: 90%;
  padding: 20px;
  margin: 20px 0;
  font-size: 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}
</style>

