/*THE CHECKBOX NEEDS TO BE CHECKED FOR THE PROCEED BUTTON TO WORK*/

const btn = document.getElementById("button");
const check = document.getElementById("tmp-28");
btn.addEventListener("click", () => {
  if (check.checked == false) {
    alert("Please, check the box below!");
  } else {
    btn.style.backgroundColor = "#9ffcfc";
    window.location.href = "quiz.html";
  }
});
