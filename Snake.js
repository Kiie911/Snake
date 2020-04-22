const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// tạo đơn vị
const box = 32;

// ảnh

const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

const gameOver=new Image();
gameOver.src="Game-over.png";

// âm thanh

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "Audio/dead.mp3";
eat.src = "Audio/eat.mp3";
up.src = "Audio/up.mp3";
right.src = "Audio/right.mp3";
left.src = "Audio/left.mp3";
down.src = "Audio/down.mp3";

function Snake() {
    this.status=true;
    this.snakee=[];
    this.snakee[0]={
        x:9*box,
        y:10*box
    };
    this.getSnake=function () {
        let a=this.snakee;
        return a;
    }
    // this.speed=1;
    // this.Dead=function () {
    // }

    // this.Eat=function (xSnake,ySnake,foodX,foodY) {
    //  if(xSnake == foodX.x && ySnake == foodY.y){
    //     score++;
    //     eat.play();
    //     apple = {
    //         x : Math.floor(Math.random()*17+1) * box,
    //         y : Math.floor(Math.random()*15+3) * box
    //     }return xSnake,ySnake;
    //     // không xóa đuôi
    //  }else{
    //     // xóa đuôi
    //     snake.pop();
    // // }
 };
function Food() {
    this.food ="";
    this.getFood=function() {
        food={
            x: Math.floor(Math.random() * 15 + 3) * box,
            y: Math.floor(Math.random() * 13 + 5) * box,
        };
        return food;
    };
}
// Tạo ra new snake1 và food1
let snake1=new Snake();
let food1=new Food();
let apple= food1.getFood();
let snake = snake1.getSnake();
// Tạo điểm số

let score = 0;
// let highScore=0;

//điều khiển rắn

let d;// hướng di chuyển của rắn

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
       left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// kiểm tra chức năng va chạm
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// vẽ mọi thứ với canvas

function draw(){

    ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "yellow" : "black";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, apple.x, apple.y);

    // vị trí đầu cũ
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // add new Head


    // di chuyển theo hướng nào
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;


    // //Khi rắn ăn food
    // snake1.Eat=function(snakeX , snakeY , apple , apple)

    // Khi rắn ăn food
    if(snakeX == apple.x && snakeY == apple.y){
        score++;
        eat.play();
        apple = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // không xóa đuôi
    }else{
        // xóa đuôi
        snake.pop();
        if (typeof (Storage) !== "undefined") {
            localStorage.highScore = 0;
            if (score > localStorage.highScore) {
                localStorage.highScore = score;
                document.getElementById("highScore").innerHTML = score;
            }
        }
    }

    // add new Head

    let newHead = {
        x : snakeX,
        y : snakeY
    };

    // game over

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        snake.status=false;
        clearInterval(game);
        dead.play();
        ctx.drawImage(gameOver,5*box,6*box);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
    // let highScores=0;
    // if (highScore <= score){
    //     highScore=score;
    //     ctx.fillStyle = "red";
    //     ctx.font = "45px Changa one";
    //     ctx.fillText(highScores,10*box,1.6*box)
    // }
    // ;
}

// dùng setInterval để draw với timeout:150 ms
    let game = setInterval(draw,200);

function Play() {
    d = "RIGHT"
}
function NewGame() {
    location.reload()
}
// function pause() {
//     game=setInterval(draw,1000);
//
// }
if (localStorage.highScore === undefined) {
    document.getElementById("highScore").innerHTML = '0';
}
else {
    document.getElementById("highScore").innerHTML = localStorage.highScore;
}




