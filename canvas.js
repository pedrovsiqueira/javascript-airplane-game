const canvas = document.getElementById( 'canvas' )
const ctx = canvas.getContext( '2d' )
width = this.canvas.width = 900;
height = this.canvas.height = 800;
let id = null
let frames = 0
let myObstacles = []

//load images
//background
var img = new Image();
img.src = "./images/BG.png";

//airplane image
var airplane = new Image()
airplane.src = "./images/Plane/fly1.png"

//obstacle image
var obstacle = new Image()
obstacle.src = "./images/fly1.png"

//airplane variables

window.onload = function () {
    document.getElementById( "start-button" ).onclick = function () {
        startGame()
    };
}

function startGame() {
    requestAnimationFrame( updateCanvas )
}

function stopGame() {
    cancelAnimationFrame( id )
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
        this.x += this.speedX
        this.y += this.speedY
    }

    drawPlane() {
        ctx.drawImage( airplane, this.x, this.y, this.width, this.height )
    }

    updatePlane() {
        // ctx.clearRect( 0, 0, 1500, 1700 );
        this.drawPlane()
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
        return this.y + this.height;
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
    var crashed = myObstacles.some(function(obstacle) {
      return airplane1.crashWith(obstacle);
    });
  
    if (crashed) {
      stopGame();
    }
  }

class Obstacle {
    constructor( y ) {
        this.x = width + 1
        this.y = y
        this.width = 70
        this.height = 50
    }

    drawObstacle() {
        ctx.drawImage( obstacle, this.x, this.y, this.width, this.height )
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
        return this.y + this.height;
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
            airplane1.speedY += -.8
            console.log( 'up', airplane1 );
            break;
        case 40:
            airplane1.speedY += .8
            console.log( airplane1.speedY )
            console.log( 'down', airplane1 );
            break;
        case 37:
            airplane1.speedX += -.8
            console.log( airplane1.speedX )
            console.log( 'left', airplane1 );
            break;
        case 39:
            airplane1.speedX += .8
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
    airplane1.newPos()
    airplane1.updatePlane()
    //object
    createObstacles()
    moveObstacle()
    
    id = requestAnimationFrame( updateCanvas );
    checkGameOver();
}

let airplane1 = new Airplane( 30, 250, 100, 80 )