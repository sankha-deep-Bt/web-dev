const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");



let gameOver = false;  
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;


let foodX , foodY;
let headX = 5, headY = 10;
let snake_body = [];
let directionX = 0, directionY = 0; 

changefoodPos = () => {

    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}

const handelgameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!!! To replay please press ok...");
    location.reload();
}

const changeDirection = (e) => {

    if(e.key === "ArrowUp" && directionY != 1) {
        directionX = 0;
        directionY = -1;
    } else if(e.key === "ArrowDown" && directionY != -1){
        directionX = 0;
        directionY = 1;
    } else if(e.key === "ArrowLeft" && directionX != 1){
        directionX = -1;
        directionY = 0;
    } else if(e.key === "ArrowRight" && directionX != -1){
        directionX = 1;
        directionY = 0;
    }
    initGame();
}

const initGame = () => {
    if(gameOver) return handelgameOver();
    let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX} "></div>`;

    if(headX === foodX && headY === foodY) {
        changefoodPos();
        snake_body.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;

    }

    for (let i = snake_body.length - 1; i > 0; i--) {
        snake_body[i] = snake_body[i - 1];    
    }

    snake_body[0] = [headX, headY]
    
    headX += directionX;
    headY += directionY; 
    
    if(headX <= 0 || headX > 30 || headY <= 0 || headY > 30){
        gameOver = true;
    }

    for (let i = 0; i < snake_body.length; i++) {
        
        htmlMarkup += `<div class = "head" style = "grid-area: ${snake_body[i][1]} / ${snake_body[i][0]} "></div>`;
        if(i !== 0  && snake_body[0][1] === snake_body[i][1] && snake_body[0][0] === snake_body[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;

}
changefoodPos();
setIntervalId = setInterval(initGame, 125)
initGame();
document.addEventListener("keydown", changeDirection);
