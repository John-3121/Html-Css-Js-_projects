

let board = document.getElementById('game-board')
let text = document.getElementById('instruction-text')
let logo = document.getElementById('logo')
let score = document.getElementById('score')
let highscoretext = document.getElementById('highScore')
//define variables

let snake = [{ x: 10, y: 10 }]
let gridSize = 20
let food = generateFood()
let direction = 'right'
let getInterval;
let gameSpeedDelay = 150
let gameStarted = false
let highScore = 0



function draw() {
  board.innerHTML = ''
  drawSnake()
  drawfood()
  updateScore()

}

function drawSnake() {
  snake.forEach((segment) => {
    let snakeElement = createGameElement('div', 'snake')
    setPosition(snakeElement, segment)
    board.appendChild(snakeElement)
  })
}

function createGameElement(tag, className) {
  let element = document.createElement(tag)
  element.className = className
  return element

}

function setPosition(element, position) {
  element.style.gridColumn = position.x
  element.style.gridRow = position.y
}

function drawfood() {
  if (gameStarted) {
    let foodElement = createGameElement('div', 'food')
    setPosition(foodElement, food)
    board.appendChild(foodElement)
  }
}

function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}


//snakeMovement
function move(){
  let head = { ...snake[0] }
  switch(direction){
    case 'right':
      head.x++
      break;
    case 'left':
      head.x--
      break;
    case 'up':
        head.y--
      break;
    case 'down':
      head.y++
      break;
      default:
  }
  snake.unshift(head)
 // snake.pop()
 
 if (head.x === food.x && head.y === food.y){
   food = generateFood()
   
   increaseSpeed()
  clearInterval(getInterval)
   getInterval = setInterval(() => {
     move()
     collide()
     draw()
   }, gameSpeedDelay)
   
 } else {
   snake.pop()
 }
  
}
  

function startGame(){
  gameStarted = true
  text.style.display = 'none'
  logo.style.display = 'none' 
  getInterval = setInterval(() => {
    move();
    collide()
    draw();
  }, gameSpeedDelay);
}


function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}
document.addEventListener('keydown',handleKeyPress)


function increaseSpeed() {
  //  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 50;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
  
}
function collide(){

  if (snake[0].x < 1 || snake[0].x > gridSize || snake[0].y < 1 || snake[0].y > gridSize){
    resetGame()
  }
  
  
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      resetGame()
    }}
    

  
}


function resetGame(){
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  highscore()
  updateScore()
  stopGame()
}


function updateScore() {
  const currentScore = snake.length - 1 ;
  score.textContent = currentScore.toString().padStart(3, '0');
}
function stopGame() {
  clearInterval(getInterval)
  gameStarted = false
  text.style.display = 'block'
  logo.style.display = 'block' 
}
function highscore(){
  let currentScore = snake.length -1
  if (currentScore > highScore){
    highscoretext.innerHTML = currentScore.toString().padStart(3,'0')
    highscoretext.style.display = 'block'

  }
}
