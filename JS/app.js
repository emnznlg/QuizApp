const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const next_btn = quiz_box.querySelector(".next-btn");
const option_list = document.querySelector(".option-list");
const time_count = document.querySelector(".timer .timer-sec");
const time_line = document.querySelector("header .time-line");
const result_box = document.querySelector(".result-box");
const restart_quiz_button = result_box.querySelector(".buttons .restart");
const quit_quiz_button = result_box.querySelector(".buttons .quit");
const time_off = document.querySelector(".time-text");

start_btn.onclick = () => {
  info_box.classList.add("active-info");
};

exit_btn.onclick = () => {
  info_box.classList.remove("active-info");
};

continue_btn.onclick = () => {
  info_box.classList.remove("active-info");
  quiz_box.classList.add("active-quiz");
  showQuestions(0);
  questionCounter(1);
  startTimer(15);
  startTimeLine(0);
};

let question_count = 0;
let question_number = 1;
let counter;
let time_value = 15;
let widthValue = 0;
let userScore = 0;

next_btn.onclick = () => {
  if (question_count < questions.length - 1) {
    question_count++;
    question_number++;
    showQuestions(question_count);
    questionCounter(question_number);
    clearInterval(counter);
    startTimer(time_value);
    clearInterval(timeLine);
    startTimeLine(widthValue);
    next_btn.style.display = "none";
    time_off.textContent = "Time Left";
  } else {
    showResultBox();
  }
};

function showQuestions(index) {
  const question_text = document.querySelector(".question-text");
  let question_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    ' <div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    ' <div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    ' <div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    ' <div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  question_text.innerHTML = question_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    //Aşağıdaki this olayını anlamadım...
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(choice) {
  clearInterval(counter);
  clearInterval(timeLine);
  let userChoice = choice.textContent;
  let correctAnswer = questions[question_count].answer;
  let allOptions = option_list.children.length;
  if (userChoice == correctAnswer) {
    choice.classList.add("correct");
    choice.insertAdjacentHTML("beforeend", tickIconTag);
    userScore += 1;
  } else {
    choice.classList.add("incorrect");
    choice.insertAdjacentHTML("beforeend", crossIconTag);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAnswer) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }

  next_btn.style.display = "block";
}

function questionCounter(index) {
  const bottom_question_counter = document.querySelector(".total-question");
  let total_question_count_tag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "<p>Questions</span>";
  bottom_question_counter.innerHTML = total_question_count_tag;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    time_count.textContent = time;
    time--;
    if (time < 9) {
      time_count.textContent = "0" + time;
    }
    if (time < 0) {
      clearInterval(counter);
      time_count.textContent = "00";
      time_off.textContent = "Time OFF";

      let correctAnswer = questions[question_count].answer;
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAnswer) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        }
      }

      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }

      next_btn.style.display = "block";
    }
  }
}

function startTimeLine(time) {
  timeLine = setInterval(timer, 26);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 549) {
      clearInterval(timeLine);
    }
  }
}

function showResultBox() {
  info_box.classList.remove("active-info");
  quiz_box.classList.remove("active-quiz");
  result_box.classList.add("active-result");

  const scoreText = document.querySelector(".score-text");
  if (userScore > 3) {
    let scoreTag = `<span>and Congrats! You got &nbsp;<p class="score"> ${userScore} </p>&nbsp;out of&nbsp;<p> ${questions.length} </p></span>`;
    scoreText.innerHTML = scoreTag;
  } else if (userScore >= 1) {
    let scoreTag = `<span>and you got only&nbsp;<p class="score"> ${userScore} </p>&nbsp;out of&nbsp;<p> ${questions.length} </p></span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>and Sorry! You got only&nbsp;<p class="score"> 0 </p>&nbsp;out of&nbsp;<p> ${questions.length} </p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}

quit_quiz_button.onclick = () => {
  window.location.reload();
};

restart_quiz_button.onclick = () => {
  result_box.classList.remove("active-result");
  quiz_box.classList.add("active-quiz");

  let question_count = 0;
  let question_number = 1;
  let time_value = 15;
  let widthValue = 0;
  let userScore = 0;
  showQuestions(question_count);
  questionCounter(question_number);
  clearInterval(counter);
  startTimer(time_value);
  clearInterval(timeLine);
  startTimeLine(widthValue);
  next_btn.style.display = "none";
  time_off.textContent = "Time Left";
};
