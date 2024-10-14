let startTime, updatedTime, difference, tInterval;
let running = false;
let resetTime = true;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 10);
    running = true;
    resetTime = false;
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milli = Math.floor( difference / 10 ) %100

  display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milli)}`;
}

function stopTimer() {
  clearInterval(tInterval);
  running = false;
}

function resetTimer() {
  clearInterval(tInterval);
  display.innerHTML = "00:00:00";
  running = false;
  resetTime = true;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}