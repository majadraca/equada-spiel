var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

var ctx = canvas.getContext("2d");

var y = 0;
var x = Math.random() * (canvas.width - 50);
var dx = 0;
var dy = 1;

var catcherHeight = 25;
var catcherWidth = 200;
var catcherStartingPoint = (canvas.width - catcherWidth) / 2; 

var right = false;
var left = false;

var points = 0;



function animateQuadrat() {
    var img = new Image();
    img.onload = function () {
        ctx.beginPath();
        ctx.drawImage(img, x, y);
        ctx.closePath();
    };
    img.src = "ice-cream.png";

}

function animateCatcher() {
    ctx.beginPath();
    ctx.rect(catcherStartingPoint, canvas.height-catcherHeight, catcherWidth, catcherHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animateQuadrat();
    animateCatcher();
    if(y + dy == window.innerHeight - 125) {
        if(x > catcherStartingPoint && x < catcherStartingPoint + catcherWidth) {
            points += 1;
            console.log(points);
            document.querySelector("h2").innerHTML = "Points: " + points;
            StopAnmination();
        } else {
            StopAnmination();
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    } 

    x += dx;
    y += dy;

    if(right) {
        catcherStartingPoint += 5;
        if(catcherStartingPoint + catcherWidth > canvas.width) {
            catcherStartingPoint = canvas.width - catcherWidth;
        }
    } else if(left) {
        catcherStartingPoint -= 5;
        if(catcherStartingPoint < 0) {
            catcherStartingPoint = 0;
        }
    }
}

function StopAnmination() {
    y = 0;
    x = Math.random() * innerWidth;
}

 

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
    if(event.key == "ArrowRight") {
        right = true;
    } else if (event.key == "ArrowLeft"){
        left = true;
    }
}

function keyUpHandler(event) {
    if(event.key == "ArrowRight") {
        right = false;
    } else if (event.key == "ArrowLeft"){
        left = false;
    }
}


var interval = setInterval(animate,10);

