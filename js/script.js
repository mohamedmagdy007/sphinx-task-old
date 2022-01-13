const Quetions = Array.from(document.querySelectorAll(".items .quetion"));
let quetionsCount = Quetions.length;
let currentSlide = 1;

let btnNext = document.querySelector(".btn-next");
let btnBack = document.querySelector(".btn-back");
let choose = document.querySelectorAll(".choose");
let choosetwo = document.querySelectorAll(".choose2");
let reloadBtn = document.querySelector(".reloadBtn");
let reloadAllBtn = document.querySelector(".reloadAllBtn");
let showAnsBtn = document.querySelector(".showAns");
let numbers = document.querySelector(".numbers");
let container = document.querySelector(".container");
let wrapper = document.querySelector(".contant");
let p = document.querySelectorAll(".q");
let p2 = document.querySelectorAll(".q2");

let elWidth = container.offsetWidth;
let elHeight = container.offsetHeight;
let audioRight = new Audio("audio/assets_right.wav");
let audioWrong = new Audio("audio/assets_wrong.wav");

btnNext.onclick = nextSlide;
btnBack.onclick = backSlide;
reloadBtn.onclick = removeAnswer;
reloadAllBtn.onclick = removeAnswerALL;
showAnsBtn.onclick = showAnswers;

function nextSlide() {
  if (!btnNext.classList.contains("disabled")) {
    currentSlide++;
    checker();
  } else {
    return false;
  }
}
function backSlide() {
  if (!btnBack.classList.contains("disabled")) {
    currentSlide--;
    checker();
  } else {
    return false;
  }
}

function checkerAns() {
  choose.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (item.dataset.answer == "correct") {
        item.classList.add("correct");
        choose[index + 1].classList.add("disabled");
        choose[index + 1].setAttribute("disabled", "");
        item.parentElement.classList.replace("notcompleted", "completed");
        audioRight.play();
      } else if (item.dataset.answer == "incorrect") {
        if (item.getAttribute("disabled") === "") {
          return true;
        } else {
          setTimeout(() => {
            item.classList.add("incorrect");
          }, 100);
          setTimeout(() => {
            item.classList.remove("incorrect");
          }, 1000);
          audioWrong.play();
        }
      }
    });
  });
  choosetwo.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (item.dataset.answer === "correct") {
        choosetwo[index - 1].classList.add("disabled");
        choosetwo[index - 1].setAttribute("disabled", "");
        item.classList.add("correct");
        item.parentElement.classList.replace("notcompleted", "completed");
        audioRight.play();
      } else if (item.dataset.answer === "incorrect") {
        if (item.getAttribute("disabled") === "") {
          return true;
        } else {
          setTimeout(() => {
            item.classList.add("incorrect");
          }, 100);
          setTimeout(() => {
            item.classList.remove("incorrect");
          }, 1000);
          audioWrong.play();
        }
      }
    });
  });
}

function showAnswers() {
  if (currentSlide === 1) {
    choose.forEach((item, index) => {
      if (item.dataset.answer === "correct") {
        choose[index + 1].classList.add("disabled");
        choose[index + 1].setAttribute("disabled", "");
        item.classList.add("correct");
        item.parentElement.classList.replace("notcompleted", "completed");
      }
    });
    p.forEach((pp) => {
      if (pp.classList.contains("completed")) {
        showAnsBtn.classList.add("disabled");
        showAnsBtn.setAttribute("disabled", "");
      } else {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  } else {
    choosetwo.forEach((item, index) => {
      if (item.dataset.answer === "correct") {
        choosetwo[index - 1].classList.add("disabled");
        choosetwo[index - 1].setAttribute("disabled", "");
        item.classList.add("correct");
        item.parentElement.classList.replace("notcompleted", "completed");
      }
    });
    p2.forEach((pp) => {
      if (pp.classList.contains("completed")) {
        showAnsBtn.classList.add("disabled");
        showAnsBtn.setAttribute("disabled", "");
      } else {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  }
}

function removeAnswer() {
  if (currentSlide === 1) {
    choose.forEach((item) => {
      item.classList.remove("correct");
      item.classList.remove("disabled");
      item.removeAttribute("disabled");
      item.parentElement.classList.replace("completed", "notcompleted");
    });
    p.forEach((pp) => {
      if (pp.classList.contains("notcompleted")) {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  } else {
    choosetwo.forEach((item) => {
      item.classList.remove("correct");
      item.classList.remove("disabled");
      item.removeAttribute("disabled");
      item.parentElement.classList.replace("completed", "notcompleted");
    });
    p2.forEach((pp) => {
      if (pp.classList.contains("notcompleted")) {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  }
}

function removeAnswerALL() {
  choose.forEach((item) => {
    item.classList.remove("correct");
    item.classList.remove("disabled");
    item.removeAttribute("disabled");
    item.parentElement.classList.replace("completed", "notcompleted");
    showAnsBtn.classList.remove("disabled");
    showAnsBtn.removeAttribute("disabled");
  });
  choosetwo.forEach((item) => {
    item.classList.remove("correct");
    item.classList.remove("disabled");
    item.removeAttribute("disabled");
    item.parentElement.classList.replace("completed", "notcompleted");
    showAnsBtn.classList.remove("disabled");
    showAnsBtn.removeAttribute("disabled");
  });
}

function checker() {
  removeActive();
  numbers.textContent = `${currentSlide}  of  ${quetionsCount}`;
  Quetions[currentSlide - 1].classList.add("active");
  if (currentSlide === 1) {
    btnBack.classList.add("disabled");
    p.forEach((pp) => {
      if (pp.classList.contains("completed")) {
        showAnsBtn.classList.add("disabled");
        showAnsBtn.setAttribute("disabled", "");
      } else {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  } else {
    btnBack.classList.remove("disabled");
    p2.forEach((pp) => {
      if (pp.classList.contains("completed")) {
        showAnsBtn.classList.add("disabled");
        showAnsBtn.setAttribute("disabled", "");
      } else {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  }

  if (currentSlide === quetionsCount) {
    btnNext.classList.add("disabled");
  } else {
    btnNext.classList.remove("disabled");
  }
}

removeActive = () => {
  Quetions.forEach((que) => {
    que.classList.remove("active");
  });
};

window.addEventListener("load", () => {
  const loader = document.querySelector(".loading");
  loader.style.display = "none";
});

window.addEventListener("load", doResize);
window.addEventListener("resize", doResize);
function doResize() {
  let size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  let scale = Math.min(size.width / elWidth, size.height / elHeight);
  container.style.transform = `scale(${scale})`;
  container.style.top = "0";
  container.style.left = "0";
}
checker();
checkerAns();
