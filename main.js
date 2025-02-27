// theme effect 
let themeEffect = document.querySelector("#theme-mode")
let currentTheme = "light";

themeEffect.addEventListener('click', () => {
  console.log('theme effect');
  if (currentTheme==="light") {
    currentTheme = "dark";
    document.querySelector("header").classList.add("light");
    document.querySelector("header").classList.remove("dark");
    document.querySelector("footer").classList.add("light");
    document.querySelector("footer").classList.remove("dark");
    document.querySelector("#quiz_container").classList.add("light_box");
    document.querySelector("#quiz_container").classList.remove("dark_box");
    console.log("theme changed to dark");
  } else {
    currentTheme = "light";
    document.querySelector("header").classList.add("dark");
    document.querySelector("header").classList.remove("light");
    document.querySelector("footer").classList.add("dark");
    document.querySelector("footer").classList.remove("light");
    document.querySelector("#quiz_container").classList.add("dark_box");
    document.querySelector("#quiz_container").classList.remove("light_box");
    console.log("theme changed to light");
    
  }
  
})

// ------------------------------------------

let questions = [];
let userAnswers = [];
let correctAnswers = [];
let currentQuestion = 0;

function generateQuestions() {
  const operators = ["+", "-", "*", "%"];

  for (let i = 0; i < 10; i++) {
    let num1 = Math.floor(Math.random() * 21) - 10;
    let num2 = Math.floor(Math.random() * 21) - 10;
    let num3 = Math.floor(Math.random() * 21) - 10;

    let op1, op2;
    do {
      op1 = operators[Math.floor(Math.random() * operators.length)];
      op2 = operators[Math.floor(Math.random() * operators.length)];
    } while (op1 === op2);

    let formattedNum1 = num1 < 0 ? `(${num1})` : num1;
    let formattedNum2 = num2 < 0 ? `(${num2})` : num2;
    let formattedNum3 = num3 < 0 ? `(${num3})` : num3;

    let question = `${formattedNum1} ${op1} ${formattedNum2} ${op2} ${formattedNum3}`;
    questions.push(question);
    correctAnswers.push(eval(question));
  }

  displayQuestion();
}

function displayQuestion() {
  if (currentQuestion < 10) {
    document.getElementById("question-heading").innerText = `Question ${
      currentQuestion + 1
    }`;
    document.getElementById(
      "question-text"
    ).innerText = `Solve: ${questions[currentQuestion]}`;
    document.getElementById("answer").value = "";
    document.getElementById("error-message").innerText = "";
  } else {
    showResults();
  }
}

function nextQuestion() {
  let answer = document.getElementById("answer").value;

  if (answer.trim() === "") {
    document.getElementById("error-message").innerText =
      "Please enter an answer or click 'Skip'.";
    return;
  }

  userAnswers.push(parseInt(answer));
  currentQuestion++;
  displayQuestion();
}

function skipQuestion() {
  userAnswers.push(null); // Mark skipped questions with null
  currentQuestion++;
  displayQuestion();
}

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  let resultsList = document.getElementById("results-list");
  resultsList.innerHTML = "";
  let score = 0;

  for (let i = 0; i < 10; i++) {
    let isCorrect = userAnswers[i] === correctAnswers[i];
    if (isCorrect) score++;

    let resultCard = document.createElement("div");
    resultCard.classList.add("result-box", isCorrect ? "correct" : "incorrect");

    resultCard.innerHTML = `
      <p><strong>Q${i + 1}:</strong> ${questions[i]} = <strong>${
      correctAnswers[i]
    }</strong></p>
      <p>(Your Answer: <strong>${
        userAnswers[i] !== null ? userAnswers[i] : "Skipped"
      }</strong>)</p>
      <p>${isCorrect ? "✔️ Correct" : "❌ Wrong"}</p>
    `;

    resultsList.appendChild(resultCard);
  }

  document.getElementById(
    "final-score"
  ).innerText = `Your Score: ${score} / 10`;
}

// Initialize quiz
generateQuestions();
