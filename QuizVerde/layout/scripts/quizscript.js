const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container1')
const questionElement = document.getElementById('question')
const scoreElement = document.getElementById('score')
const answerButtonsElement = document.getElementById('answer-buttons')
let score = 0;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btt')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    console.log(answerButtonsElement.children)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Qual é a maior floresta do mundo?',
    answers: [
      { text: 'Amazónia', correct: false },
      { text: 'Taiga', correct: true },
      { text: 'Kakamega', correct: false },
      { text: 'Yakushima', correct: false }
    ]
  },
  {
    question: 'Em que continente fica a floresta amazônica?',
    answers: [
      { text: 'Europa', correct: false },
      { text: 'América do Sul', correct: true },
      { text: 'Oceania', correct: false },
      { text: 'Africa', correct: false }
    ]
  },
  {
    question: 'Entre 2001 e 2010 quantos hectares de florestas foram abatidos anualmente?',
    answers: [
      { text: '43.2M', correct: false },
      { text: '3.7M', correct: false },
      { text: '10.4M', correct: true },
      { text: '7M', correct: false }
    ]
  },
  {
    question: 'Qual destes não é um tipo de floresta?',
    answers: [
      { text: 'Temperada', correct: false },
      { text: 'Tropical', correct: true },
      { text: 'Subtropical', correct: false },
      { text: 'Arborial', correct: false }
    ]
  }
]