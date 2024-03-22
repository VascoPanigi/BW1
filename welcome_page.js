/*THE CHECKBOX NEEDS TO BE CHECKED FOR THE PROCEED BUTTON TO WORK*/

const btn = document.getElementById("button");
const check = document.getElementById("tmp-28");
const checkboxDiv = document.getElementById("checkboxDiv");

check.addEventListener("click", () => {
  if (check.checked) {
    btn.classList.add("glow");
    btn.style.backgroundColor = "#00ffff";
    btn.style.color = "rgb(3, 3, 34)";
  } else {
    btn.classList.remove("glow");
    btn.style.backgroundColor = "rgb(145, 145, 145)";
    btn.style.color = "rgb(66, 66, 66)";
  }
});
/*const warning = document.getElementById("alert")
btn.addEventListener("click", () => {
 if (!warning) {
    if (check.checked == false) {
    const alert = document.createElement("h6")
    alert.id = "alert"
    alert.classList.add("h6")
    alert.innerText = "PLEASE, CHECK THE BOX!"
    checkboxDiv.appendChild(alert)
  } else {
    btn.style.backgroundColor = "#9ffcfc";
    window.location.href = "quiz.html";}
 }
});*/

const warning = document.getElementById("checked");
btn.addEventListener("click", () => {
  if (!check.checked) {
    warning.innerText = "PLEASE, CHECK THE BOX!";
  } else {
    warning.innerText = "";
    btn.style.backgroundColor = "#9ffcfc";
    window.location.href = "quiz.html";
  }
});
