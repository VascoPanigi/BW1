/*THE CHECKBOX NEEDS TO BE CHECKED FOR THE PROCEED BUTTON TO WORK*/

const btn = document.getElementById("button");
const check = document.getElementById("tmp-28");
const checkboxDiv = document.getElementById("checkboxDiv")

check.addEventListener (
  "click", () => {
    if (check.checked == true)
    btn.classList.add("glow")
    btn.style.backgroundColor = "#00ffff"  
    btn.style.color = "rgb(3, 3, 34)"
  }
);
btn.addEventListener("click", () => {
  if (check.checked == false) {
    const alert = document.createElement("h6")
    alert.classList.add("h6")
    alert.innerText = "PLEASE, CHECK THE BOX!"
    checkboxDiv.appendChild(alert)
    /*alert("Please, check the box below!");*/
  } else {
    btn.style.backgroundColor = "#9ffcfc";
    window.location.href = "quiz.html";
  }
});
