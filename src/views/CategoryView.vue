<template>
  <div class="category-container">
    <div class="category-main">
      <button class="category-button" @click="navigateToChoices('music')">Music</button>
      <button class="category-button" @click="navigateToChoices('science')">Science</button>
      <button class="category-button" @click="navigateToChoices('literature')">Literature</button>
      <button class="category-button" @click="navigateToChoices('social')">Social</button>
    </div>

    <div class="category-footer">
      <button class="category-button" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToChoices(category) {
  router.push({ name: 'choice', params: { category } });
}

function goBack() {
  router.push({ name: 'home' });
}
</script>

<style>
.category-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
}

.category-main {
  width: 100%;
}

.category-button {
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

.category-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 80px;
}
</style>
