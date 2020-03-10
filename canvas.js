const canvas = document.getElementById( 'canvas' )
const ctx = canvas.getContext( '2d' )
width = this.canvas.width = 900;
height = this.canvas.height = 800;
let id = null
let frames = 0
let myObstacles = []
let lives = 3;
var points = 0
var contador = 0
var contadorObstacle = 0


//load images
//background
var img = new Image();
img.src = "./images/bg.png";

//airplane image
var airplane = new Image()
airplane.src = "./images/Plane/fly1.png"

var airplane2 = new Image()
airplane2.src = './images/Plane/fly2.png'

//obstacle image
var obstacle = new Image()
obstacle.src = "./images/1.png"

var obstacle2 = new Image()
obstacle2.src = './images/4.png'

var airplaneDead = new Image()
airplaneDead.src = "./images/Plane/Dead (1).png"

var heart = new Image()
heart.src = './images/heart.png'

//load audio
var crashSound = new Audio()
crashSound.src = './Sounds/crash.wav'

window.onload = function () {
    document.getElementById( "start-button" ).onclick = function () {
        startGame()
    };
}

function startGame() {
    requestAnimationFrame( updateCanvas )
}

function stopGame() {
    console.log( `game over` )
    cancelAnimationFrame( id )
    backgroundImage.draw();
    createObstacles()
    moveObstacle()
    score()
    airplane1.updateDeadPlane()
}

function score(){
    var points = Math.floor(frames / 5);
    ctx.font = "32px arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + points, 112, 32);
}

class Airplane {
    constructor( x, y, width, height ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speedX = 0;
        this.speedY = 0;
    }

    newPos() {
        //limitar esquerda
        if ( airplane1.x >= 0 ) {
            this.x += this.speedX
        } else {
            this.x = 0
        }
        if ( airplane1.x <= width - 100 ) {
            this.x += this.speedX
        } else {
            this.x = ( width - 100 )
        }
        if ( airplane1.y >= 0 ) {
            this.y += this.speedY
        } else {
            this.y = 0
        }
        if ( airplane1.y <= height - 77 ) {
            this.y += this.speedY
        } else {
            this.y = ( height - 77 )
        }
    }

    drawPlane() {
        if(contador == 10){
            contador = 0
        }
        if(contador < 5 ){
            ctx.drawImage( airplane, this.x, this.y, this.width, this.height )
            contador++
        } else if(contador < 10) {
            ctx.drawImage( airplane2, this.x, this.y, this.width, this.height)
            contador++
        }
    }

    drawDeadPlane() {
        ctx.drawImage( airplaneDead, this.x, this.y, this.width, this.height )
    }

    drawHeart() {
        let xHeart = 5
        let yHeart = 5
        for ( let i = 0; i < lives; i++ ) {
            ctx.drawImage( heart, xHeart, yHeart, 30, 30 )
            xHeart += 35
        }
    }

    updatePlane() {
        this.drawPlane()
    }

    updateDeadPlane() {
        this.drawDeadPlane()
    }

    left() {
        return this.x;
    }
    right() {
        return this.x + this.width - 4;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height - 11;
    }

    crashWith( obstacle ) {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
    }
}

function checkGameOver() {

    myObstacles.forEach( function (element, index) {
        if(airplane1.crashWith(element) && lives === 1){
            crashSound.play()
            stopGame()
        } else if(airplane1.crashWith(element)){
            console.log(`colidiu`)
            myObstacles.splice(index, 1)
            lives--
        }
    })
}

class Obstacle {
    constructor( y ) {
        this.x = width + 1
        this.y = y
        this.width = 70
        this.height = 50
    }

    drawObstacle() {
        if(contadorObstacle == 51){
            contadorObstacle = 0
        }
        if(contadorObstacle < 30 ){
            ctx.drawImage( obstacle, this.x, this.y, this.width, this.height )
            contadorObstacle++
            console.log(contadorObstacle)
        } else if(contador < 51) {
            ctx.drawImage( obstacle2, this.x, this.y, this.width, this.height)
            contadorObstacle++
            console.log(contadorObstacle)

        }
    }

    updateObstacle() {
        this.x -= 2
    }

    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height - 8;
    }
}

function createObstacles() {
    frames += 1
    if ( frames % 120 === 0 ) {
        console.log( `Objeto Criado` )
        return myObstacles.push( new Obstacle( Math.floor( Math.random() * ( height - 50 ) ) ) )
    }
}

function moveObstacle() {
    myObstacles.forEach( element => {
        element.drawObstacle()
        element.updateObstacle()
    } )
}


var backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

    move: function () {
        this.x += this.speed;
        this.x %= canvas.width;
    },

    draw: function () {
        ctx.drawImage( this.img, this.x, 0 );
        if ( this.speed < 0 ) {
            ctx.drawImage( this.img, this.x + canvas.width, 0 );
        } else {
            ctx.drawImage( this.img, this.x - this.img.width, 0 );
        }
    },
};


document.onkeydown = function ( e ) {
    switch ( e.keyCode ) {
        case 38:
            airplane1.speedY += -1
            console.log( 'up', airplane1 );
            break;
        case 40:
            airplane1.speedY += 1
            console.log( airplane1.speedY )
            console.log( 'down', airplane1 );
            break;
        case 37:
            console.log( `Position X: ` + airplane1.x )
            airplane1.speedX += -1
            console.log( 'left', airplane1 );
            break;
        case 39:
            airplane1.speedX += 1
            console.log( 'right', airplane1 );
            break;
    }
}

document.onkeyup = function ( e ) {
    airplane1.speedX = 0;
    airplane1.speedY = 0;
};

function updateCanvas() {
    //background
    backgroundImage.move();
    backgroundImage.draw();
    //airplane
    airplane1.drawHeart()
    airplane1.newPos()
    airplane1.updatePlane()

    //object
    createObstacles()
    moveObstacle()


    score()

    id = requestAnimationFrame( updateCanvas );
    checkGameOver();
}

let airplane1 = new Airplane( 0, width / 2, 100, 80 )