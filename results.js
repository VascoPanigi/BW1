// l/obiettivo è quello di creare due arrayç uno per le risposte giuste
//e uno per le risposte sbagliate. nei data di chartData
//poi prenderò le length dei due arrai come dati

// import correct_answer from 'quiz.js'
// import totalScore from 'quiz.js'

let params = new URLSearchParams(window.location.search); // recupero parametri passati all url baretto
let risposteCorrette = parseInt(params.get("a")); // Recupero risposte corrette parametro URL e converto in numero intero baretto
console.log(risposteCorrette);

let totaledomande = parseInt(params.get("b")); // Recupero domande totali parametro URL e converto in numero intero baretto

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
for (let i = 0; i < questions.length; i++) {
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
/*test di prova*/
