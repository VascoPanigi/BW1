const selectionInput = document.querySelectorAll(".selectButtonLv");

const inputDifficulty = document.getElementById("selectDifficulty");
const inputAmount = document.getElementById("selectAmount");
let numTotAns = document.getElementById("totNumAns");

let questionsArray = [];
let amountNum = 10;
let difficultySel = "easy";

inputDifficulty.addEventListener("change", function (e) {
  difficultySel = e.target.value;
  updateApiUrl();
});

inputAmount.addEventListener("change", function (e) {
  amountNum = e.target.value;
  numTotAns.innerHTML = "/" + amountNum;
  updateApiUrl();
});
console.log(questionsArray);

let apiUrl =
  "https://opentdb.com/api.php?amount=" +
  amountNum +
  "&category=18&difficulty=" +
  difficultySel.toLowerCase();

function updateApiUrl() {
  apiUrl =
    "https://opentdb.com/api.php?amount=" +
    amountNum +
    "&category=18&difficulty=" +
    difficultySel.toLowerCase();
}
// commento//
async function fetchQuestions() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  data.results.forEach((question) => {
    questionsArray.push({
      question: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers,
    });
  });

  return questionsArray;
}

// fetchQuestions().then(() => {
//   console.log(questionsArray);
// });

const startButton = document.getElementById("startBtn");
const questionNumber = document.getElementById("questionNumber");
const questionNumberHeader = document.querySelector(
  "footer h4.question-number"
);
const mainContainer = document.querySelector("main");
let correctAnswers = [];
let wrongAnswers = [];
// let allAnswers = currentQuest.incorrect_answers.concat(
//   currentQuest.correct_answer
// );
const totalScore = questionsArray.length;
let currentQuestionIndex = 0;
const circularProgress = document.querySelector(".circular-progress");
const progressValue = document.querySelector(".progress-value");
const clockContainer = document.getElementById("clock-container");
const speed = 1000;
let progress;

console.log(correctAnswers);
console.log(wrongAnswers);

// startButton.addEventListener("click", () => {
//   clearPage();
//   fetchQuestions()
//   displayQuestion(0);
//   questionNumberHeader.classList.remove("invisible");
// });

startButton.addEventListener("click", async () => {
  clearPage();

  const questionsArray = await fetchQuestions();
  displayQuestion(0);
  questionNumberHeader.classList.remove("invisible");
  clockContainer.classList.remove("invisible");
  console.log(questionsArray);
});

const clearPage = () => {
  mainContainer.innerHTML = "";
};

const displayQuestion = (index) => {
  //prendo nota del numero di oggetti nell'array per calcolare lo score totale
  //che si fa (numero risposte giuste/numero totale domande) * 100
  //questo dato andra' ad aggiornare il results.js
  // const totalScore = questions.length;
  // console.log(totalScore)
  clearInterval(progress);
  startTimer();
  const correctAnswersLen = correctAnswers.length;
  const currentQuest = questionsArray[index];

  //genero un div e lo pusho nel main

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-title-container");
  mainContainer.appendChild(questionDiv);

  //genero un h1 che prende il titolo dall'oggetto e lo pusho nel div

  const questionTitle = document.createElement("h1");
  questionTitle.classList.add("question-title");
  questionTitle.innerText = currentQuest.question;
  questionDiv.appendChild(questionTitle);

  //unisco le risposte in un array unico
  const answers = currentQuest.incorrect_answers.concat(
    currentQuest.correct_answer
  );

  const shuffledQuestions = shuffleArray(answers);

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("question-container");
  mainContainer.appendChild(answerDiv);

  //per ogni elemento nell'array di risposte, ciclo
  shuffledQuestions.forEach((answer) => {
    const questionButton = document.createElement("button");
    questionButton.classList.add("questionBtn");
    questionButton.innerText = answer;
    questionButton.addEventListener("click", () => {
      //rimuovo a tutti i questionBtn la classe selected
      //altrimenti l'utente puo' selezionare piu' risposte e far esplodere
      //tutto
      const allButtons = document.querySelectorAll(".questionBtn");
      allButtons.forEach((btn) => btn.classList.remove("clickedBtn"));
      questionButton.classList.add("clickedBtn");
      if (answer === currentQuest.correct_answer) {
        if (!correctAnswers.includes(currentQuest.correct_answer)) {
          correctAnswers.push(currentQuest.correct_answer);
          console.log("Correct!");
        }
      } else {
        if (!wrongAnswers.includes(answer)) {
          wrongAnswers.push(answer);
          console.log("Incorrect!");
        }
      }

      //ora ogni volta che io clicco una risposta si passa alla prossima
      //io voglio che il sito tenga conto della mia risposta, che sara' colorata
      //finche' io non vada avanti o il timer finisca
      questionButton.classList.add("clickedBtn");
    });
    answerDiv.appendChild(questionButton);
    // console.log(correctAnswers)
    console.log(correctAnswersLen);
  });

  //per ogni domanda creo un bottone che va avanti
  const nextQuestDiv = document.createElement("div");
  nextQuestDiv.classList.add("next-question-container");
  mainContainer.appendChild(nextQuestDiv);

  const nextQuestBtn = document.createElement("button");
  nextQuestBtn.classList.add("next-question-button");
  nextQuestBtn.innerText = "Next";
  nextQuestDiv.appendChild(nextQuestBtn);
  nextQuestBtn.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsArray.length) {
      clearPage();
      displayQuestion(currentQuestionIndex);
    } else {
      console.log("End of questions.");
      redirectToResultPage();
    }
  });
  nextQuestDiv.appendChild(nextQuestBtn);
  questionNumber.innerText = currentQuestionIndex + 1;
};

// const redirectToResultPage = () =>
//   (window.location.href = `results.html?a=${correctAnswers.length}&b=${amountNum}`); // baretto passaggio risposte corrette + totale domande

//todo1: aggiornare il question alla fine della pagina
//todo2 aggiungere un bottone alla fine della pagina per mandare avanti, le
//domande dovranno proseguire solo alla pressione di quel bottone.

//todo3: collegare lo score con il results.js

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Shuffle the questions array

// setTimeout(console.log(shuffledQuestions), 5000);
// setTimeout(startTimer, 1000);
// Function to start the timer

const startTimer = () => {
  let progressStartValue = 60;
  let progressEndValue = 0;
  let degreesPerUnit = 360 / (progressStartValue - progressEndValue);

  progress = setInterval(() => {
    progressStartValue--;
    progressValue.textContent = `${progressStartValue}`;

    let angle = (progressStartValue - progressEndValue) * degreesPerUnit;
    angle = angle < 0 ? angle + 360 : angle;

    circularProgress.style.background = `conic-gradient(#00ffff ${angle}deg, #827f7f47 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
      goToNextQuestion();
    }
  }, speed);
};

const goToNextQuestion = () => {
  clearInterval(progress);
  let nextIndex = currentQuestionIndex + 1;
  if (nextIndex < questionsArray.length) {
    clearPage();
    currentQuestionIndex = nextIndex;
    displayQuestion(currentQuestionIndex);
    startTimer();
  } else {
    console.log("End of questions.");
    redirectToResultPage();
  }
};

// questionsArray.forEach((question) => {
//   const questionText = question.question;
//   const correctAnswer = question.correct_answer;
//   const incorrectAnswers = question.incorrect_answers;

//   const ulOfQuestion = document.createElement("ul");

//   const liQuestion = document.createElement("li");
//   liQuestion.innerText = questionText;
//   ulOfQuestion.appendChild(liQuestion);

//   const liCorrectAnswer = document.createElement("li");
//   liCorrectAnswer.innerText = correctAnswer;
//   ulOfQuestion.appendChild(liCorrectAnswer);

//   const liIncorrectAnswer = document.createElement("li");
//   liIncorrectAnswer.innerText = incorrectAnswers;
//   ulOfQuestion.appendChild(liIncorrectAnswer);

//   document.body.appendChild(ulOfQuestion);
//   console.log("Domanda:", questionText);
//   console.log("Risposta Corretta:", correctAnswer);
//   console.log("Risposte Sbagliate:", incorrectAnswers);
// });

const createRecap = () => {
  const currentQuest = questionsArray[index];

  const answerRecapDiv = document.createElement("div");
  answerRecapDiv.classList.add("answer-recap-container");
  mainContainer.appendChild(answerRecapDiv);

  const answerRecapH3 = document.createElement("h3");
  answerRecapH3.classList.add("answer-recap-title");
  answerRecapH3.innerText = currentQuest.question;
  answerRecapDiv.appendChild(answerRecapH3);

  const answerRecapAllQuestions = document.createElement("div");
  answerRecapAllQuestions.classList.add("answer-recap-container-questions");
  mainContainer.appendChild(answerRecapAllQuestions);

  const answeRecapUl = document.createElement("ul");
  answeRecapUl.classList.add("answer-recap-ul");
  answerRecapAllQuestions.appendChild(answeRecapUl);

  answers.forEach((answer) => {
    const answerRecapUl = document.createElement("li");
    answerRecapUl.classList.add("answer-recap-li");
    answerRecapUl.innerText = answer;
    answerRecapDiv.appendChild(answerRecapUl);

    if (questionsArray.correct_answer === answer) {
      answer.classList.add("correct-answer");
    }
    if (wrongAnswers.includes(answer)) {
      answer.classList.add("wrong-answer");
    }
  });
};

//^^^^^^quando le domande sono finite, si deve inizializzare questa funzione^^^^^^^^

//array con risposta corretta originale V
//array con risposte corrette
//array con risposte sbagliate

//noi stiamo ciclando

// DEFAULT -> TUTTE le risposte corrette originali sono in verde
// SE nell'array in cui abbiamo pushato tutte le risposte
//corrette troviamo una risposta === a quella corrente del forEach -> non facciamo niente
//se invece lo trova ma nell-altro array, cambia la classe in rosso
//ciao sono un commento
