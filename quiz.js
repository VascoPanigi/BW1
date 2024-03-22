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
  mainContainer.innerText = "";
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
      //redirectToResultPage();
      clearPage();
      questionNumberHeader.classList.add("invisible");
      showDoughnut();
      createRecap();
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
    // redirectToResultPage();
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
  clearPage();

  const recapMainDiv = document.createElement("div");
  recapMainDiv.classList.add("recap-main-container");
  mainContainer.appendChild(recapMainDiv);

  questionsArray.forEach((question, index) => {
    const {
      question: questionText,
      correct_answer,
      incorrect_answers,
    } = question;

    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-recap-container");
    recapMainDiv.appendChild(questionContainer);

    const questionHeading = document.createElement("h3");
    questionHeading.classList.add("question-heading");
    questionHeading.textContent = `${index + 1}. ${questionText}`;
    questionContainer.appendChild(questionHeading);

    const answerList = document.createElement("ul");
    answerList.classList.add("answer-list");
    questionContainer.appendChild(answerList);

    const allAnswers = incorrect_answers.concat(correct_answer);

    allAnswers.forEach((answer) => {
      const answerItem = document.createElement("li");
      answerItem.textContent = answer;

      if (correct_answer === answer) {
        answerItem.classList.add("correct-answer");
      } else if (wrongAnswers.includes(answer)) {
        answerItem.classList.add("wrong-answer");
      }

      answerList.appendChild(answerItem);
    });
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

//INIZIO RESULT

// l/obiettivo è quello di creare due arrayç uno per le risposte giuste
//e uno per le risposte sbagliate. nei data di chartData
//poi prenderò le length dei due arrai come dati

// import correct_answer from 'quiz.js'
// import totalScore from 'quiz.js'

let risposteCorrette = correctAnswers.length;
console.log(risposteCorrette);

let totaledomande = amountNum;

let rispostsbagliate = totaledomande - risposteCorrette; // Calcolo delle risposte sbagliate baretto

let scorepositivo = document.querySelector("#positiveScore");
let scorenegativo = document.querySelector("#negativeScore");

function calcolaPercentuale(totaledomande, rispostsbagliate) {
  return (rispostsbagliate / totaledomande) * 100;
}

let percentuale = Math.round(
  calcolaPercentuale(totaledomande, rispostsbagliate)
);
let questions = document.getElementsByClassName("fontFix");
for (let i = 0; i < questions.length; i++) {
  questions[i].innerHTML =
    risposteCorrette + "/" + totaledomande + " questions";
}

let questionWrong = document.getElementsByClassName("fontFix2");
for (let i = 0; i < questionWrong.length; i++) {
  questionWrong[i].innerHTML =
    rispostsbagliate + "/" + totaledomande + " questions";
}

questions.innerHTML;
scorenegativo.innerHTML = percentuale + "%";
scorepositivo.innerHTML = 100 - percentuale + "%"; // Calcolo della percentuale positiva baretto

let messH3 = document.getElementById("messageResH3");
let messH5 = document.getElementById("messageResH5");
let messP = document.getElementById("messageResP");

if (percentuale <= 40) {
  messH3.innerHTML = "Congratulations!";
  messH5.innerHTML = "You passed the exam.";
  messP.innerHTML =
    "We'll send you the certificate in few minutes. Check your email (including promotions / spam folder)";
} else {
  messH3.innerHTML = "We're sorry...";
  messH5.innerHTML = "You didn't pass the exam.";
  messP.innerHTML = "Please conctact us if you want to take the test again!"; // Cambio del messaggio nel cerchio in base al fatto che hai superat ono l'esame baretto
}
// commento
const labels1 = ["right", "wrong"];
let data1 = [risposteCorrette, rispostsbagliate];
const colors1 = ["#00FFFF", "#D20094"];

const myChart = document.querySelector(".my-chart");

let chart = new Chart(myChart, {
  type: "doughnut",
  data: {
    datasets: [
      {
        backgroundColor: colors1,
        data: data1,
        borderWidth: 0,
        cutout: 135,
      },
    ],
  },
});

const rateBtn = document.getElementById("rating-btn");

rateBtn.addEventListener("click", () => redirectToRatingPage());

const redirectToRatingPage = () => (window.location.href = "stelline_mod.html");
const showDoughnut = () => {
  const div = document.getElementById("doughnut-container");
  div.classList.remove("invisible");
};
