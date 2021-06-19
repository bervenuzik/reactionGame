document.body.addEventListener("click", redLigth);

let startTime;
let finishTime;
let resultTime;
let check = true;
let done = false;
let resultStorage = localStorage;
let bestresultNode = document.querySelector(".bestResult");

console.log(resultStorage);



  if (resultStorage.getItem("bestResult") == !true ) {
    bestresultNode.textContent = resultStorage.getItem("bestResult");
    
  } else {
    bestresultNode.textContent = "Not played before";
  }
  

function waiting(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}





function redLigth(event) {

  for (let i = 1; i <= 5; i++) {
    let lighter = document.querySelector(`.section${i}`);
    let cirkle = lighter.querySelectorAll("div");
    for (let j = 0; j < 4; j++) {
      cirkle[j].style.background = "grey";
    }
  }

  setTimeout(async () => {
    document.body.removeEventListener("click", redLigth);
    for (let i = 1; i <= 5; i++) {
      await waiting(900);
      let lighter = document.querySelector(`.section${i}`);
      let cirkle = lighter.querySelectorAll("div");
      cirkle[2].style.background = "#FF5733";
      cirkle[3].style.background = "#FF5733";
    }
    let miliseconds = getRandomTimeMIliseconds();
    let seconds = getRandomTimeSeconds();
    if (seconds === 0) {
      await waiting(`${miliseconds}00`);
    } else {
      await waiting(`${seconds}${miliseconds}00`);
    }

    let greenLight = document.querySelectorAll(`.green`);
    for (let i = 0; i < greenLight.length; i++) {
      greenLight[i].style.background = "#17FF00";
      
    }
    startTime = new Date();

    document.body.addEventListener("click", checkChange);
  }, 0);
}





function countTime() {
  let text = "";
  let paragraph = document.querySelector(".reactionTime");
  let paragraphSeconds = document.querySelector(".seconds");
  let paragraphMilliseconds = document.querySelector(".milliseconds");
  let seconds = 0;
  let milliseconds = 0;
  let result;

  finishTime = new Date();
  resultTime = finishTime - startTime;
  seconds = String(Math.trunc(resultTime / 1000));
  milliseconds = String(resultTime % 1000);
  paragraphMilliseconds.textContent = milliseconds;
  paragraphSeconds.textContent = seconds;
  paragraph.animate([
    // keyframes
    { transform: 'scale(3)' }, 
    { transform: 'scale(1.0)' }
  ], { 
    // timing options
    duration: 40,
    iterations: 1
  });
  result = +paragraph.textContent;
  
  console.log(result);
  if (resultStorage.getItem("bestResult") > result || resultStorage.getItem("bestResult") == undefined ) {
    resultStorage.setItem("bestResult", result);
  }
  document.body.removeEventListener("click", checkChange);
  document.body.addEventListener("click", redLigth);

  console.log(resultStorage);
  bestresultNode.textContent = resultStorage.getItem("bestResult");
}




function checkChange() {
  countTime();
  document.body.removeEventListener("click", checkChange);
}



function getRandomTimeSeconds() {
  return Math.floor(Math.random() * (4 - 1) + 1);
}



function getRandomTimeMIliseconds() {
  return Math.floor(Math.random() * 9);
}
