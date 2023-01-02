let gameStart = 1;
let snakeSize = 50;
let speedx = snakeSize;
let speedy = 0;
let snakeX = 0;
let snakeY = 0;
let snakeLength = 3;
let canvasSize = 50 * 15;
let snakeCord = [];
let gamestate = true;
let steps = 0;
let apples = 0;
let maxApples = 1;
let appleX = [];
let appleY = [];
let applesEaten = 0;

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(5);
  stroke(1);
}

function draw() {
  background("lightgreen");
  game();
}

function game() {
    snakeMovement();
    if (apples < maxApples) {
      drawApple();
    }
    eatApple();
    drawGrid();
    createNewApple();
    noStroke();
    drawSnake();
    pause();
    gameEnd();
    fill("blue");
    textSize(30);
    text("Apples Eaten: " + applesEaten, 500, 30);
}

function drawGrid() {
  for (i = 0; i < (canvasSize / snakeSize); i++) {
    strokeWeight(1 / 50 * snakeSize);
    stroke("black");
    line(0, i * snakeSize, canvasSize, i * snakeSize);
    line(i * snakeSize, 0, i * snakeSize, canvasSize);
  }
}

function drawSnake() {
  if (gamestate === true) {
    snakeX = snakeX + speedx;
    snakeY = snakeY + speedy;
    snakeCord.push([snakeX, snakeY]);
    steps++;
  }
  for (i = 0; i < snakeCord.length; i++) {
    fill("green");
    const x = snakeCord[i][0];
    const y = snakeCord[i][1];
    square(x, y, snakeSize);
  }
  square(snakeX, snakeY, snakeSize);
  if (snakeCord.length > snakeLength - 1) {
    snakeCord.shift();
  }
}

function drawApple() {
  createNewApple();
}

function createNewApple() {
  applex = round(random(0, 14));
  appley = round(random(0, 14));
  fill("lightgreen");
  append(appleX, applex * snakeSize);
  append(appleY, appley * snakeSize);
  square(appleX[0], appleY[0], snakeSize);
  apples++;
  noStroke();
  fill("red");
  circle(appleX[0] + snakeSize / 2, appleY[0] + snakeSize / 2, snakeSize - 5);
}

function eatApple() {
  for (i = 0; i < snakeCord.length; i++) {
    if (snakeCord[i][0] === appleX[0]) {
      if (snakeCord[i][1] === appleY[0]) {
        appleX.shift();
        appleY.shift();
        apples = 0;
        snakeLength++;
        applesEaten++;
      }
    }
  }
}

function snakeMovement() {
  if (speedy !== snakeSize) {
    if (keyCode === UP_ARROW) {
      gamestate = true;
      speedx = 0;
      speedy = -1 * snakeSize;
    }
  }
  if (speedy !== -1 * snakeSize) {
    if (keyCode === DOWN_ARROW) {
      gamestate = true;
      speedx = 0;
      speedy = snakeSize;
    }
  }
  if (speedx !== snakeSize) {
    if (keyCode === LEFT_ARROW) {
      gamestate = true;
      speedx = -1 * snakeSize;
      speedy = 0;
    }
  }
  if (speedx !== -1 * snakeSize) {
    if (keyCode === RIGHT_ARROW) {
      gamestate = true;
      speedx = snakeSize;
      speedy = 0;
    }
  }
}

function pause() {
  if (keyCode === 32) {
    gamestate = false;
    speedx = 0;
    speedy = 0;
    fill("white");
    textSize(100);
    text("Paused", 100, 300);
  }
}

function gameEnd() {
  if (snakeX < 0) {
    playAgain();
  }
  if (snakeY < 0) {
    playAgain();
  }
  if (snakeX >= canvasSize) {
    playAgain();
  }
  if (snakeY >= canvasSize) {
    playAgain();
  }
  if (steps > snakeLength) {
    for (i = 0; i < snakeCord.length - 1; i++) {
      let sX = snakeCord[snakeCord.length - 1][0];
      let x = snakeCord[i][0];
      let sY = snakeCord[snakeCord.length - 1][1];
      let y = snakeCord[i][1];
      if (sX === x && sY === y) {
        playAgain();
      }
    }
  }
}

function playAgain() {
  fill("white");
  textSize(100);
  background("rgba(0, 0, 0, 0.5)");
  text("GAME OVER", 100, 300);
  noLoop();
}

const highScore = ( p ) => {
  p.setup = function(){
    p.createCanvas(750, 750);
    p.background("white");
    img = loadImage('High-Score.JPG');
  };

  p.draw = function(){
    p.image(img, 0, 0);
  };
};


let bestScore = new p5(highScore);
