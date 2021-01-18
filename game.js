const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const timeText = document.getElementById('timeText');
const timeBarFull = document.getElementById('timeBarFull');
let timeCounter = 0;//
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQueston = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

setInterval(() => createquestion, 1)

createquestion=()=>{
  const firstNumber=Math.round(Math.random()*9)
  const secondNumber=Math.round(Math.random()*9)
  const result= firstNumber*secondNumber
  var numbers = [];
  numbers[0]= result;

  do {
    numbers[1]= Math.round(Math.random()*99)
    numbers[2]= Math.round(Math.random()*99)
    numbers[3]= Math.round(Math.random()*99)
   } while ( (numbers[0] == numbers[1]) || (numbers[0] == numbers[2]) || (numbers[0] == numbers[3]) ||
             (numbers[1] == numbers[2]) || (numbers[1] == numbers[3]) || (numbers[2] == numbers[3])  );
   
  var choice = [];
  
  do {
    choice[0]= numbers[Math.floor(Math.random() * numbers.length)]
    choice[1]= numbers[Math.floor(Math.random() * numbers.length)]
    choice[2]= numbers[Math.floor(Math.random() * numbers.length)]
    choice[3]= numbers[Math.floor(Math.random() * numbers.length)]
   } while ( (choice[0] == choice[1]) || (choice[0] == choice[2]) || (choice[0] == choice[3]) ||
             (choice[1] == choice[2]) || (choice[1] == choice[3]) || (choice[2] == choice[3]) );
   
  for (i=0; i<4; i++){ 
    if(choice[i] == result)
      answerIndex = i+1;
  } 
  let k=new Object;
  k={    
  question: firstNumber+" "+"*" + " "+secondNumber+"    " +" Find the product of these two numbers",
   choice1: choice[0],
   choice2: choice[1],
   choice3: choice[2],
   choice4: choice[3],
  answer: answerIndex    
 }
 return k;
}
let questions = [];
for (let k = 0; k < 10; k++) {
  questions.push(createquestion())
}

let switchA = 0;
document.querySelector("#startstop").addEventListener("click", () => {

  if (switchA == 1) {
    document.querySelector("#music").pause();
  } else {
    document.querySelector("#music").play();
  }
  switchA = !switchA;
})
timerPrint = () => {
  setInterval(() => {
    timeCounter++;
    timeText.innerText = `Time ${timeCounter}/${maxtime}`;
    timeBarFull.style.width = `${(timeCounter / maxtime) * 100}%`;
    if (timeCounter == 10) {
      getNewQuestion()
      timeCounter = 0
    }
  }, 1000)

}
timerPrint();

//contants
const correct_puan = 10; 
const maxQuestions = 10;
const maxtime = 10;
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions]; 
  console.log(availableQuesions);
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign('./end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;

  
  console.log;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
  const questionindex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionindex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => { 
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuesions.splice(questionindex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;
    timeCounter = 0;
    acceptingAnswers = false;
    const selectedChoise = e.target;
    const selectedAnswer = selectedChoise.dataset['number'];
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === 'correct') {
      incrementScore(correct_puan);
    }
    selectedChoise.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoise.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
var fullScreenButon = document.getElementById("Fullscreen-button");
function Fullscreen() {
  var fullScreenDiv = document.getElementById("container2");
  var fullScreenFonk = fullScreenDiv.requestFullscreen ||
    fullScreenDiv.mozRequestFullScreen ||
    fullScreenDiv.msRequestFullscreen ||
    fullScreenDiv.webkitRequestFullScreen;
  fullScreenFonk.call(fullScreenDiv);
}
fullScreenButon.addEventListener('click', Fullscreen);
startGame();
