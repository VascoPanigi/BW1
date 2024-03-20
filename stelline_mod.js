document.addEventListener("DOMContentLoaded", function() { 
    
    const buttonStars = document.querySelectorAll(".starsClass");
    const allStars = [];
    const allStarsWithFeedback = [];
        
    buttonStars.forEach(star => {
        allStars.push(star);
            
        star.onclick = event => {
            allStarsWithFeedback.length = 0;

            allStars.forEach(s => {
            s.classList.remove("newStarsClass");
            });
            for (let i = 0; i <= allStars.indexOf(star); i++) {
                allStars[i].classList.add("newStarsClass");
                allStarsWithFeedback.push(star);
            }
            console.log(allStarsWithFeedback); 
        };
    });
     
    console.log(buttonStars)
   
    const buttonSendRe = document.getElementById("sendButtonId");
    const containerStars = document.getElementsByClassName("mainBody")[0]; 
    const containerTextFeedBack = document.getElementById("comment")
    let feedbackText = ""
    
    buttonSendRe.onclick = event => {
        if (allStarsWithFeedback.length === 0) {
            alert("Please enter your feedback!");
            return; 
        }
        containerStars.remove(); 
        feedbackText = containerTextFeedBack.value;
        console.log(feedbackText)
        
        if (allStarsWithFeedback.length <= 6) {
            const neg = document.createElement("h3");
            const messageNegative = document.createElement("p");
            const sadIcon = document.createElement ("div")
            sadIcon.classList.add("far" ,"fa-frown")
            sadIcon.style.color = "red"
            sadIcon.style.fontSize = "100px"
            neg.textContent = "Thank you for your feedback!"
            messageNegative.textContent = "We're sorry your experience wasn't satisfying. Your opinion helps us improving!";
            neg.appendChild(messageNegative)
            neg.appendChild(sadIcon)
            document.body.appendChild(neg); 
    
        } else if (allStarsWithFeedback.length <= 8) {
            const neu = document.createElement("h3");
            const messageNeutral = document.createElement("p");
            const neutralIcon = document.createElement("div")
            neutralIcon.classList.add("far", "fa-meh")
            neutralIcon.style.color = "yellow"
            neutralIcon.style.fontSize = "100px"
            neu.textContent = "Thank you for your feedback!"
            messageNeutral.textContent = "Your opinion is precious to us!";
            neu.appendChild(messageNeutral);
            neu.appendChild(neutralIcon);
            document.body.appendChild(neu); 
    
        } else {
            const pos = document.createElement("h3");
            const messagePositive = document.createElement("p"); 
            const smileIcon = document.createElement("div");
            smileIcon.classList.add("far", "fa-laugh");
            smileIcon.style.color = "green";
            smileIcon.style.fontSize = "100px"
            pos.textContent = "Thank you for your feedback!"
            messagePositive.textContent = "We're glad you are happy with your experience!";
            pos.appendChild(messagePositive);
            pos.appendChild(smileIcon);
            document.body.appendChild(pos); 
        }
    }
});