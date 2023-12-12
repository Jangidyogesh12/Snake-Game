// Board dimensions

let row = 20;
let col = 20;
let blocksize = 25;
let board;
let context;

// Snake Dimensions
let snakeX = blocksize*5;
let snakeY = blocksize*5;

// Food Dimensions
let foodX = blocksize*10;
let foodY = blocksize*10;

// Giving the velocity
let velocityX = 0;
let velocityY = 0;

// SnakeBody
let snakeBody = [];

let gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = row*blocksize;
    board.width = col*blocksize;
    context = board.getContext("2d"); //used for drawing in the board

    placefood();
    document.addEventListener("keydown", changeDirection);
    setInterval(update,100);
}

function update(){
    if(gameover){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width, board.height);

    // rnadomly placing the food on the canvas
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);
    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX, foodY]);
        placefood();
    }

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    if(snakeX>blocksize*col || snakeX<0 || snakeY>blocksize*row || snakeY<0){
        gameover = true;
        alert("GAME OVER");
    }
    for(let i=0; i<snakeBody.length; i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameover = true;
            alert("GAME OVER")
        }
    }

}

function changeDirection(event){
    if(event.code=="ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(event.code=="ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(event.code=="ArrowLeft" && velocityX!=1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(event.code=="ArrowRight" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placefood(){
    foodX = Math.floor(Math.random()*col)*blocksize;
    foodY = Math.floor(Math.random()*row)*blocksize;
}
