import{Player}  from "./player.js"
import InputHandler from "./input.js"
import { Background } from "./background.js"
import { FlyingEnemy,GroundEnemy,ClimbingEnemy } from "./enemies.js"
import { UI } from "./UI.js"
var isFirstLoad = true;
window.addEventListener('load', function(){
    const canvas = this.document.getElementById("canvas1")
    const ctx = canvas.getContext("2d")
    canvas.width =1000
    canvas.height =500
    class Game{ 
        constructor(gameWidth, gameHeight) {
            this.width= gameWidth;
            this.height= gameHeight;
            this.groundMargin = 50
            this.player = new Player(this);
            this.background = new Background(this);
            this.input = new InputHandler(this);
            this.Ui = new UI(this)
            this.speed = 0
            this.maxSpeed  = 5;
            this.Enemies = []
            this.particles = []
            this.colisions = []
            this.floatMessages = []
            this.maxParticles = 50
            this.maxLives = 5
            this.enemyTimer = 0;
            this.enemyTimeInterval = 1000;
            this.time = 0 ;
            this.gameOver = false 
            this.score = 0;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltatime) { 
           this.time += deltatime;
            this.background.update(deltatime);
            this.player.update(this.input.keys,deltatime);
            if( this.enemyTimer > this.enemyTimeInterval ) {
                this.addEnemy()
                this.enemyTimer = 0
            } else this.enemyTimer += deltatime;

            this.Enemies.forEach(enemy => {
                enemy.update(deltatime)
                if(enemy.markedForDelection) this.Enemies.splice(this.Enemies.indexOf(enemy),1)
            })

            this.particles.forEach((particle,index) =>{
                particle.update()
                if (particle.markedForDelection) this.particles.splice(index,1)
            })
             this.particles.forEach((particle,index) =>{
                particle.update()
                if (particle.markedForDelection) this.particles.splice(index,1)
            })

            this.colisions.forEach((collision,index) => {
                collision.update(deltatime)
                if (collision.markedForDelection) this.colisions.splice(index,1)
            })

            this.floatMessages.forEach((floatMess,index) => {
                floatMess.update()
                if (floatMess.markedForDelection) this.floatMessages.splice(index,1)
            })
        }
        draw(ctx){
            this.background.draw(ctx);
            this.player.draw(ctx);
            this.Enemies.forEach(enemy => enemy.draw(ctx))
            this.particles.forEach(praticle => praticle.draw(ctx))
            this.colisions.forEach(collision => collision.draw(ctx))
            this.floatMessages.forEach(floatMess => floatMess.draw(ctx))
            this.Ui.draw(ctx)
        }
        addEnemy() {
            if( this.speed > 0 && Math.random() < 0.5 ) {
                this.Enemies.push(new GroundEnemy(this));
            }else if (this.speed > 0 ) this.Enemies.push(new ClimbingEnemy(this))
            this.Enemies.push(new FlyingEnemy(this))
        }
    }
    const game = new Game(canvas.width,canvas.height)
    
    let lasttime = 0
    function animate(timestamp) {
        ctx.clearRect(0,0,canvas.width,canvas.height) ;
        const deltatime = (timestamp - lasttime)
        lasttime = timestamp
        game.update(deltatime)
        game.draw(ctx)
        if(!game.gameOver) requestAnimationFrame(animate)
    }
    if(isFirstLoad) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('Guide', game.width*0.5, game.height * 0.5);
        ctx.restore();
    }
     animate(0)
    function restartGame() {
        game.player.restart();
        game.background.restart();
        game.score = 0;
        game.time = 0;
        game.gameOver = false;
        game.maxLives =5;
        animate(0);
    }
    this.window.addEventListener("keydown", e=> {
        if(e.key == "F2" && game.gameOver) {
            restartGame();
        } 
    })
})