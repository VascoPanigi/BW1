document.addEventListener("DOMContentLoaded", function () {
  const buttonStars = document.querySelectorAll(".starsClass");
  const allStars = [];
  const allStarsWithFeedback = [];

  buttonStars.forEach((star) => {
    allStars.push(star);

    star.onclick = (event) => {
      allStarsWithFeedback.length = 0;

      allStars.forEach((s) => {
        s.classList.remove("newStarsClass");
      });
      for (let i = 0; i <= allStars.indexOf(star); i++) {
        allStars[i].classList.add("newStarsClass");
        allStarsWithFeedback.push(star);
      }
      console.log(allStarsWithFeedback);
    };
  });

  console.log(buttonStars);

  const buttonSendRe = document.getElementById("sendButtonId");
  const containerStars = document.getElementsByClassName("mainBody")[0];

  buttonSendRe.onclick = (event) => {
    if (allStarsWithFeedback.length === 0) {
      alert(
        "Per favore, seleziona un numero di stelle prima di inviare il feedback."
      );
      return;
    }
    containerStars.remove();

    if (allStarsWithFeedback.length <= 6) {
      const messageNegative = document.createElement("h1");
      const sadIcon = document.createElement("div");
      sadIcon.classList.add("far", "fa-frown");
      sadIcon.style.color = "red";
      sadIcon.style.fontSize = "50px";
      messageNegative.textContent =
        "Grazie per il feedback...Ci dispiace che non ti sia trovato bene ";
      messageNegative.appendChild(sadIcon);
      document.body.appendChild(messageNegative);
    } else if (allStarsWithFeedback.length <= 8) {
      const messageNeutral = document.createElement("h1");
      const neutralIcon = document.createElement("div");
      neutralIcon.classList.add("far", "fa-meh");
      neutralIcon.style.color = "yellow";
      neutralIcon.style.fontSize = "50px";
      messageNeutral.textContent =
        "Grazie per il feedback...Con il vostro parere proviamo sempre a migliorare ";
      messageNeutral.appendChild(neutralIcon);
      document.body.appendChild(messageNeutral);
    } else {
      const messagePositive = document.createElement("h1");
      const smileIcon = document.createElement("div");
      smileIcon.classList.add("far", "fa-laugh");
      smileIcon.style.color = "green";
      smileIcon.style.fontSize = "50px";
      messagePositive.textContent =
        "Grazie per il feedback...Siamo contenti che ti sia trovato bene ";
      messagePositive.appendChild(smileIcon);
      document.body.appendChild(messagePositive);
    }
  };
});
