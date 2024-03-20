/*const btn = document.getElementsByTagName("optgroup");
btn.addEventListener("click", () => { 
    btn.forEach(button => {
       btn.style.backgroundColor = "#9ffcfc";
    } )  
   });*/

 /* const btn = document.getElementsById("startBtn");
  btn.addEventListener("click", () => { 
          btn.style.backgroundColor = "#9ffcfc";
      });*/

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "How can i create a checkbox in HTML?",
    correct_answer: '&lt;input type="checkbox"&gt;',
    incorrect_answers: [
      '&lt;input type="check"&gt;',
      "&lt;checkbox&gt;",
      '&lt;input type="button"&gt;',
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What amount of bits commonly equals one byte",
    correct_answer: "8",
    incorrect_answers: ["1", "2", "64"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "How long is anIPv6 address?",
    correct_answer: "128",
    incorrect_answers: ["8", "32", "64"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

const selectionInput = document.querySelectorAll(".selectButtonLv")


let questionsArray = [];
let amountNum = 5;
let difficultySel = "medium"
console.log(questionsArray)
const apiUrl ="https://opentdb.com/api.php?amount=" + amountNum + "&category=18&difficulty=" + difficultySel;
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
const correctAnswers = [];
const totalScore = questionsArray.length;
let currentQuestionIndex = 0;
const circularProgress = document.querySelector(".circular-progress");
const progressValue = document.querySelector(".progress-value");
const clockContainer = document.getElementById("clock-container");
const speed = 1000;
let progress;

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
  console.log(questionsArray)
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

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("question-container");
  mainContainer.appendChild(answerDiv);

  //per ogni elemento nell'array di risposte, ciclo
  answers.forEach((answer) => {
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
        correctAnswers.push(currentQuest.correct_answer);
        console.log("Correct!");
      } else {
        console.log("Incorrect!");
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

const redirectToResultPage = () => (window.location.href = "results.html");

//todo1: aggiornare il question alla fine della pagina
//todo2 aggiungere un bottone alla fine della pagina per mandare avanti, le
//domande dovranno proseguire solo alla pressione di quel bottone.

//todo3: collegare lo score con il results.js

// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// // Shuffle the questions array
// const shuffledQuestions = shuffleArray(questionsArray);

// setTimeout(console.log(shuffledQuestions), 5000);

// Function to start the timer
function startTimer() {
  let progressStartValue = 5; // Initial value of timer
  let progressEndValue = 0; // End value of timer
  let degreesPerUnit = 360 / (progressStartValue - progressEndValue);

  progress = setInterval(() => {
    progressStartValue--;
    progressValue.textContent = `${progressStartValue}`;

    let angle = (progressStartValue - progressEndValue) * degreesPerUnit;
    angle = angle < 0 ? angle + 360 : angle;

    circularProgress.style.background = `conic-gradient(#00ffff ${angle}deg, #827f7f47 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
      goToNextQuestion(); // Call function to go to next question
    }
  }, speed);
}

// Function to go to the next question
function goToNextQuestion() {
  clearInterval(progress);
  let nextIndex = currentQuestionIndex + 1;
  if (nextIndex < questionsArray.length) {
    clearPage();
    currentQuestionIndex = nextIndex;
    displayQuestion(currentQuestionIndex);
    startTimer(); // Start the timer for the next question
  } else {
    console.log("End of questions.");
    redirectToResultPage();
  }
}
