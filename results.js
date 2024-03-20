// l/obiettivo è quello di creare due arrayç uno per le risposte giuste
//e uno per le risposte sbagliate. nei data di chartData
//poi prenderò le length dei due arrai come dati

// import correct_answer from 'quiz.js'
// import totalScore from 'quiz.js'

const labels1 = ["right", "wrong"];
let data1 = [80, 20];
const colors1 = ["#D20094", "#00FFFF"];

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
