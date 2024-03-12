import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { music, science, literature, social } from './data/questions.js'
import {
  music1, music2, music3, music4, music5, music6,
  science1, science2, science3, science4, science5, science6,
  literature1, literature2, literature3, literature4, literature5, literature6,
  social1, social2, social3, social4, social5, social6
} from './data/answers.js'

export const initializeData = () => {
  if (localStorage.getItem('quizData')) {
    return
  }

  const questionsData = { music, science, literature, social }
  const answersData = {
    music1, music2, music3, music4, music5, music6,
    science1, science2, science3, science4, science5, science6,
    literature1, literature2, literature3, literature4, literature5, literature6,
    social1, social2, social3, social4, social5, social6
  }
  const structuredData = {}

  for (const category in questionsData) {
    structuredData[category] = Object.keys(questionsData[category]).map((questionKey, index) => {
      const question = questionsData[category][questionKey]
      const answersKey = `${category}${index + 1}`
      const answers = answersData[answersKey];
      const formattedAnswers = Object.keys(answers).map(answerKey => {
        return {
          title: answers[answerKey].title || answers[answerKey],
          isItCorrect: answers[answerKey].isItCorrect !== undefined ? answers[answerKey].isItCorrect : null
        }
      })

      return { question, answers: formattedAnswers, spoken: false }
    })
  }

  localStorage.setItem('quizData', JSON.stringify(structuredData))
}

initializeData()

const app = createApp(App)

app.use(router)

app.mount('#app')
