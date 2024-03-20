// l/obiettivo è quello di creare due arrayç uno per le risposte giuste
//e uno per le risposte sbagliate. nei data di chartData
//poi prenderò le length dei due arrai come dati

// import correct_answer from 'quiz.js'
// import totalScore from 'quiz.js'

let params = new URLSearchParams(window.location.search); // recupero parametri passati all url barettp
let risposteCorrette = params.get("a"); // recupero risposte corrette parametro url baretto
console.log(risposteCorrette);

let totaledomande = params.get("b"); // recupero domande totali parametro url baretto

let rispostsbagliate = totaledomande - risposteCorrette; // calcolo per le risposte sbagliate baretto

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
