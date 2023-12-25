let timer;
let timeLimit = 5;
let score = 0;
let questionsRemaining = 5;

const option1 = document.getElementById("option1"),
      option2 = document.getElementById("option2"),
      option3 = document.getElementById("option3"),
      audio = document.getElementById("myAudio");  
let answer = 0;

option1.addEventListener("click", clickOption);
option2.addEventListener("click", clickOption);
option3.addEventListener("click", clickOption);

function startTimer() {
    timer = setInterval(function () {
        timeLimit--;
        document.getElementById('timer').textContent = timeLimit;   
        console.log(timeLimit)
        if (timeLimit <= 0) {
            endGame();
        } 
    }, 1000);
}

startTimer()

function stopTimer() {
    clearInterval(timer);
}

function endGame() {
    stopTimer();
    document.getElementById('gameover').textContent = 'Game Over! Your final score is ' + score + '. Lanjut ke soal selanjutnya' ;
    
    option1.removeEventListener("click", clickOption);
    option2.removeEventListener("click", clickOption);
    option3.removeEventListener("click", clickOption);
}

function clickOption(event) {
  const selectedOption = event.target;
  if (selectedOption.innerHTML == answer) {
      score += 20;
  } else {
      audio.play();
  }

  questionsRemaining--;

  if (questionsRemaining > 0) {
    generate_equation();
  } else {
    endGame();
  }
}

function resetGame() {
    stopTimer();
    timeLimit = 5;
    score = 0;
    questionsRemaining = 5;
    document.getElementById('timer').textContent = timeLimit;
    document.getElementById('score').textContent = score;
    document.getElementById('answer').value = '';
    document.getElementById('answer').disabled = false;
    displayQuestion();
    startTimer();
}

function generate_equation(){ 
  var num1 = Math.floor(Math.random() * 13),
      num2 = Math.floor(Math.random() * 13),
      dummyAnswer1 = Math.floor(Math.random() * 10),
      dummyAnswer2 = Math.floor(Math.random() * 10),
      allAnswers = [],
      switchAnswers = [];

  if(num1 > num2){
    answer = eval(num1 - num2);
    document.getElementById("num1").innerHTML = num1; 
    document.getElementById("num2").innerHTML = num2;
  }
  else{
    answer = eval(num2 - num1);
    document.getElementById("num1").innerHTML = num2; 
    document.getElementById("num2").innerHTML = num1;
  }
  
  allAnswers = [answer, dummyAnswer1, dummyAnswer2];

  for (i = allAnswers.length; i--;){
    switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
  };

  option1.innerHTML = switchAnswers[0];
  option2.innerHTML = switchAnswers[1];
  option3.innerHTML = switchAnswers[2]; 

};


generate_equation()


