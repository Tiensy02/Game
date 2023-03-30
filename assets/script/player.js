import { Sitting,Running,Jumping,Standding,Falling,Rolling,Diving,Hit} from "./playerState.js";
import { ColisionAnimation } from "./colisionAnimation.js";
import { FloatingMessage } from "./floattingMess.js";
export class Player{
    constructor(game){
        this.game = game;
        this.width = 100; 
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height -this.game.groundMargin;
        this.image = document.getElementById("player")
        this.farmeX = 0
        this.maxFarmeX = 5
        this.farmeY = 0
        this.speed = 0;
        this.maxSpeed = 5
        this.vy = 0
        this.weight = 1
        this.states = [new Sitting(this.game),new Running(this.game),new Jumping(this.game), new Falling(this.game), new Rolling(this.game),new Diving(this.game),new Hit(this.game),new Standding(this.game)];

        this.fps = 20
        this.farmeTimer = 0 ;
        this.farmeTimeInterval = 1000/this.fps
    }
    draw(context){
        context.drawImage(this.image,this.farmeX*this.width,this.farmeY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }
    update(input,deltatime){
        this.checkCollitision()
        this.currentState.handleInput(input)
        // horizontal movement
        this.x += this.speed;
        if ((input.includes("ArrowRight") || input.includes("d")) && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
        else if((input.includes("ArrowLeft") || input.includes("a")) && this.currentState !== this.states[6] ) this.speed = - this.maxSpeed
        else this.speed = 0
        if ( this.x < 0 ) this.x = 0
        if (this.x > this.game.width- this.width ) this.x = this.game.width- this.width 
        // vertical movement
        this.y += this.vy
        if ( !this.onGround() ) this.vy += this.weight
        else this.vy = 0
        // farme animation
        if(this.farmeTimer > this.farmeTimeInterval) {
            this.farmeX > this.maxFarmeX ? this.farmeX = 0 : this.farmeX++
            this.farmeTimer = 0
        } else this.farmeTimer += deltatime
        // vertical boundaries 
        if(this.y > this.game.height - this.height - this.game.groundMargin)  this.y = this.game.height - this.height - this.game.groundMargin

    }
    onGround(){
        return this.y >= this.game.height - this.height -this.game.groundMargin
    }
    setState(state,speed) {
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed*speed
        this.currentState.enter()
        
    } 
    checkCollitision(){
        this.game.Enemies.forEach(enemy => {
            if(enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y) {
                    enemy.markedForDelection = true
                    this.game.colisions.push(new ColisionAnimation(this.game,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5))
                    if (this.currentState=== this.states[4] || this.currentState=== this.states[5]){
                        this.game.score++
                        this.game.floatMessages.push(new FloatingMessage("+1",enemy.x,enemy.y,150,50))
                    } else{
                        this.setState(6,0)
                        this.game.maxLives --;
                        if ( this.game.maxLives < 1 ) this.game.gameOver= true
                    }

                }
        })
    }
 }