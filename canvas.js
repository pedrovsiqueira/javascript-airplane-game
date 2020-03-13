const canvas = document.getElementById( 'canvas' )
const ctx = canvas.getContext( '2d' )
width = this.canvas.width = 900;
height = this.canvas.height = 938;
let id = null
let frames = 0
let myObstacles = []
let lives = 3;
let points = 0
let contador = 0
// let contadorObstacle = 0
let gameStarted = false

//load images
//background
let img = new Image();
img.src = "./images/background.png";

//airplane image
let airplane = new Image()
airplane.src = "./images/Plane/fly1.png"

let airplane2 = new Image()
airplane2.src = './images/Plane/fly2.png'

let airplaneUp = new Image()
airplaneUp.src = './images/Plane/up.png'

let airplaneDown = new Image()
airplaneDown.src = './images/Plane/down.png'

//obstacle image
let obstacle = new Image()
obstacle.src = "./images/1.png"

let obstacle2 = new Image()
obstacle2.src = "./images/2.png"

let obstacle3 = new Image()
obstacle3.src = "./images/3.png"

let obstacle4 = new Image()
obstacle4.src = "./images/4.png"

let obstacle5 = new Image()
obstacle5.src = "./images/5.png"

let obstacle6 = new Image()
obstacle6.src = './images/6.png'

let airplaneDead = new Image()
airplaneDead.src = "./images/Plane/Dead (1).png"

let heart = new Image()
heart.src = './images/heart.png'

let arrows = new Image()
arrows.src = './images/arrows.png'

let gameOver = new Image()
gameOver.src = './images/gameover.png'

//load audio
let crashSound = new Audio()
crashSound.src = './Sounds/crash.wav'

let themeSound = new Audio()
themeSound.src = './Sounds/theme.mp3'

let finishSound = new Audio()
finishSound.src = './Sounds/finish.mp3'

let loseSound = new Audio()
loseSound.src = './Sounds/fatality.mp3'

window.onload = function () {
    document.getElementById( "start-button" ).onclick = function () {
        if ( !gameStarted )
            startGame()
    };
}

function startGame() {
    gameStarted = true
    themeSound.play()
    requestAnimationFrame( updateCanvas )
}

function restartGame() {
    location.reload();
}

function stopGame() {
    console.log( `game over` )
    cancelAnimationFrame( id )
    // backgroundImage.draw();
    ctx.clearRect( 0, 0, 900, 938 );
    createObstacles()
    moveObstacle()
    score()
    airplane1.updateDeadPlane()
    ctx.drawImage( gameOver, 300, 60, 300, 300 )
    setTimeout( restartGame, 4000 )
}

function score() {
    let points = Math.floor( frames / 5 );
    ctx.font = "32px arial";
    ctx.fillStyle = "white";
    ctx.fillText( "Score: " + points, width - 230, 32 );
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
        if ( airplane1.x >= 2 ) {
            this.x += this.speedX
        } else {
            this.x = 2
        }
        if ( airplane1.x <= width - 113 ) {
            this.x += this.speedX
        } else {
            this.x = ( width - 113 )
        }
        if ( airplane1.y >= 40 ) {
            this.y += this.speedY
        } else {
            this.y = 40
        }
        if ( airplane1.y <= height - 80 ) {
            this.y += this.speedY
        } else {
            this.y = ( height - 80 )
        }
    }

    drawPlane() {
        if ( contador == 10 ) {
            contador = 0
        }
        if ( contador < 5 ) {
            ctx.drawImage( airplane, this.x, this.y, this.width, this.height )
            contador++
        } else if ( contador < 10 ) {
            ctx.drawImage( airplane2, this.x, this.y, this.width, this.height )
            contador++
        }
    }

    drawDeadPlane() {
        ctx.drawImage( airplaneDead, this.x, this.y, this.width, this.height )
    }

    drawPlaneUp(){
        ctx.drawImage(airplaneUp, this.x, this.y, this.width, this.height)
    }

    drawPlaneDown(){
        ctx.drawImage(airplaneDown, this.x, this.y, this.width, this.height)
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

    updatePlaneUp() {
        this.drawPlaneUp()
    }

    updatePlaneDown() {
        this.drawPlaneDown()
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

    myObstacles.forEach( function ( element, index ) {
        if ( airplane1.crashWith( element ) && lives === 1 ) {
            themeSound.pause()
            loseSound.play()
            stopGame()
        } else if ( airplane1.crashWith( element ) ) {
            // console.log( `colidiu` )
            myObstacles.splice( index, 1 )
            lives--
            if(lives === 1){
                themeSound.pause()
                finishSound.play()
                setTimeout( themeSound.play(), 1000)
            }
        }
    } )
}

class Obstacle {
    constructor( y ) {
        this.x = width + 1
        this.y = y
        this.width = 70
        this.height = 50
        this.contadorObstacle = 0
    }

    drawObstacle() {
        if ( this.contadorObstacle == 36 ) {
            this.contadorObstacle = 0
        }
        if ( this.contadorObstacle < 6 ) {
            ctx.drawImage( obstacle, this.x, this.y, this.width, this.height )
            this.contadorObstacle++
        } else if ( contador < 12 ) {
            ctx.drawImage( obstacle2, this.x, this.y, this.width, this.height )
            this.contadorObstacle++
        } else if ( this.contadorObstacle < 18 ) {
            ctx.drawImage( obstacle3, this.x, this.y, this.width, this.height )
            this.contadorObstacle++
        } else if ( this.contadorObstacle < 24 ) {
            ctx.drawImage( obstacle4, this.x, this.y, this.width, this.height )
            this.contadorObstacle++
        } else if ( this.contadorObstacle < 30 ) {
            ctx.drawImage( obstacle5, this.x, this.y, this.width, this.height )
            this.contadorObstacle++
        } else if ( this.contadorObstacle <= 35 ) {
            ctx.drawImage( obstacle6, this.x, this.y, this.width, this.height )
            this.contadorObstacle++
        }
    }

    updateObstacle() {
        this.x -= 5
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
    if ( frames <= 700 ) {
        if ( frames % 60 == 0 ) {
            console.log( `Objeto Criado case 1` )
            return myObstacles.push( new Obstacle( Math.floor( Math.random() * ( height - 50 ) ) ) )
        }
    } else if ( frames < 1400 ) {
        if ( frames % 25 == 0 ) {
            console.log( `Objeto Criado case 2` )
            return myObstacles.push( new Obstacle( Math.floor( Math.random() * ( height - 50 ) ) ) )
        }
    } else if ( frames > 1400 ) {
        if ( frames % 10 == 0 ) {
            console.log( `Objeto Criado case 3` )
            return myObstacles.push( new Obstacle( Math.floor( Math.random() * ( height - 50 ) ) ) )
        }
    }
    console.log(frames)
}

function moveObstacle() {
    myObstacles.forEach( element => {
        element.drawObstacle()
        element.updateObstacle()
    } )
}

let backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

    move: function () {
        this.x += this.speed;
        this.x %= canvas.width;
    },

    draw: function () {
        ctx.drawImage( img, backgroundImage.x, 0 );
        if ( this.speed < 0 ) {
            ctx.drawImage( img, backgroundImage.x + canvas.width, 0 );
        } else {
            ctx.drawImage( img, backgroundImage.x - img.width, 0 );
        }
    },
};


document.onkeydown = function ( e ) {
    switch ( e.keyCode ) {
        case 38:
            airplane1.speedY = -2.5
            console.log( 'up', airplane1 );
            break;
        case 40:
            airplane1.speedY = 2.5
            console.log( airplane1.speedY )
            console.log( 'down', airplane1 );
            break;
        case 37:
            console.log( `Position X: ` + airplane1.x )
            airplane1.speedX = -2.5
            console.log( 'left', airplane1 );
            break;
        case 39:
            airplane1.speedX = 2.5
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
    // backgroundImage.move();
    // backgroundImage.draw();
    //airplane
    airplane1.newPos()
    ctx.clearRect( 0, 0, 900, 938 );
    airplane1.drawHeart()
    airplane1.updatePlane()

    //object
    createObstacles()
    moveObstacle()


    score()

    id = requestAnimationFrame( updateCanvas );
    checkGameOver();
}

let airplane1 = new Airplane( 0, height / 2, 100, 80 )