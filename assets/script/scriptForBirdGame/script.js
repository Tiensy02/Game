const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height =window.innerHeight;
const ColisitionCanvas = document.getElementById("colisitionCanvas")
const Colisitionctx = ColisitionCanvas.getContext("2d")
const ColisitionCANVAS_WIDTH = ColisitionCanvas.width = window.innerWidth
const ColisitionCANVAS_HEIGHT = ColisitionCanvas.height = window.innerHeight
const ravenIamge = document.getElementById("ravenImage")
const bumImage = document.getElementById("boomImage")
let gameOver = false
let ravens = []
let explositions = []
var gameFarme = 0 ;
let timeToNextRaven = 0 ;
let timeIntervar = 500;
let lastTime = 0;
let score = 0;
ctx.font = '50px Impact'
class Raven{
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.size = (Math.random()*0.4) +0.3
        this.width= this.spriteWidth *this.size
        this.height = this.spriteHeight *this.size
        this.x = CANVAS_WIDTH;
        this.y = Math.random()* (CANVAS_HEIGHT-this.height)
        this.farme = 0;
        this.speed = Math.random() * 5 +3
        this.flapSpeed = Math.floor(Math.random()*5 +3)
        this.markedForDeletion = false;
        this.directionY = Math.random() * 5 -2.5
        this.randomColor = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.color = 'rgb('+this.randomColor[0]+','+this.randomColor[1]+','+this.randomColor[2]+')'
        this.hadTrail = Math.random() > 0.5
    }
    update() {
        if( this.y < 0 || this.y > CANVAS_HEIGHT -this.height){
            this.directionY = this.directionY*-1 // đoạn này để xử lí việc raven đi ra ngoài viền trên thì ta khi đó ta chỉ cần cho direction là số đối của nó là được tại vì nếu nó đang lên nghĩa là direction của nó là số dương thì bây h đổi lại là số âm thì nó sẽ đi xuống tương tự cho trường hợp ngược lại
        } 
        this.x -= this.speed
        this.y += this.directionY
        if( gameFarme % this.flapSpeed == 0 ) {
            this.farme > 4 ? this.farme = 0 : this.farme++
            if ( this.hadTrail){

                for ( let i = 0 ; i < 5 ; i ++ ) {
    
                    paratices.push(new Paratice( this.x, this.y, this.width,this.color))
                }   
            }

        }
        if ( this.x + this.width < 0 ) {
            this.markedForDeletion = true
            gameOver = true
        }
       
    }
    draw() {
        Colisitionctx.fillStyle = this.color
        Colisitionctx.fillRect(this.x-6,this.y,this.width,this.height)
        ctx.drawImage(ravenIamge, this.farme * this.spriteWidth , 0, this.spriteWidth, this.spriteHeight , this.x, this.y , this.width, this.height)
        
    }
    restart() {
        this.x = CANVAS_WIDTH;
        this.y = Math.random()* (CANVAS_HEIGHT-this.height)
    }
}

let paratices = [] 
class Paratice{
    constructor(x,y,size,color) {
        
        this.size = size;
        this.x = x+this.size/2 +Math.random() *50 -25
        this.y = y+this.size/3 +Math.random() *50 -25
        this.color = color;
        this.radius = Math.random() * this.size/10
        this.maxRadius = Math.random()*20+35
        this.markedForDeletion = false
        this.speedX = Math.random() *1 + 0.5
    }
    update() {
        this.x += this.speedX
        this.radius += 0.3
        if ( this.radius > this.maxRadius -30) {
            this.markedForDeletion = true 
        }
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = 1 - this.radius /this.maxRadius
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill() 
        ctx.restore()
    }
}

function drawScore() {
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 50 ,75)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 53 ,78)
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white'
    ctx.fillText('GAME OVER', CANVAS_WIDTH*0.5, CANVAS_HEIGHT * 0.5 );
    ctx.fillText("press F2 to restart", CANVAS_WIDTH*0.5 , CANVAS_HEIGHT * 0.5+60 );
}

class Explosion {
    constructor(x,y,size){
       
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.x = x
        this.y = y
        this.farme = 0;
        this.timer = 0 
        this.sound = new Audio()
        this.sound.src='/assets/image/BirdGame/bum.wav'  
        this.size = size
        this.markedForDeletion = false
    }
    update() {
        if(this.farme == 0 ) this.sound.play()
        this.timer++;
        if (this.timer % 10 == 0 ) {
            this.farme++
        }
        if(this.farme > 5 ) this.markedForDeletion = true
    }
    draw() {
        ctx.drawImage(bumImage,this.farme*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.size,this.size)
    }
}

window.addEventListener('click',function(e) {
    const detectPixelColor = Colisitionctx.getImageData(e.x,e.y,1,1)
    const pc = detectPixelColor.data    
    ravens.forEach(function(value) {
        if(value.randomColor[0]== pc[0] && value.randomColor[1] == pc[1] && value.randomColor[2] == pc[2] ){
            value.markedForDeletion = true
            score++
            explositions.push(new Explosion(value.x,value.y,value.width))
        }
    })
    
})

function animate(timeStamp) {
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT) 
    Colisitionctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT) 
    let delatime = timeStamp - lastTime 
    lastTime = timeStamp
    timeToNextRaven += delatime
    if(timeToNextRaven > timeIntervar ) {
        ravens.push(new Raven()) 
        timeToNextRaven = 0;
        ravens.sort(function(a,b){
            return a.width - b.width
        })
    }
    drawScore();
    [...paratices,...ravens,...explositions].forEach(object => object.update()); // thắng nào được gọi sau thì nó sẽ phủ lên trước
    [...paratices,...ravens,...explositions].forEach(object => object.draw());
    ravens= ravens.filter(value => !value.markedForDeletion)
    explositions= explositions.filter(value => !value.markedForDeletion)
    paratices= paratices.filter(value => !value.markedForDeletion)
    gameFarme++
    if(!gameOver) requestAnimationFrame(animate)
    else drawGameOver()
}
animate(0);
function restartGame() {
    ravens = []
    score = 0;
    gameOver = false;
    ctx.textAlign = "start";
    animate(0);
}
window.addEventListener("keydown", e => {
    if(e.key == "F2" && gameOver ) {
        restartGame();
    }
})