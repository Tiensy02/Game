class Enemy {
    constructor(game){
        this.game = game;
        this.farmeX = 0 ;
        this.farmeY = 0;
        this.fps = 30;
        this.farmeTimer = 0;
        this.farmeTimeInterval = 1000 / this.fps ;
        this.markedForDelection = false;
    } 
    update(deltatime){
        this.x -= this.speedX ;
        this.y += this.speedY;
        if (this.farmeTimer > this.farmeTimeInterval ) {
            this.farmeX > this.maxFarme ? this.farmeX = 0 : this.farmeX++;
            this.farmeTimer = 0;
        } else this.farmeTimer += deltatime
        if ( this.x < - this.width ) 
        {
            this.markedForDelection = true
            this.game.maxLives--;
            
        }
    }
    draw(context){
        context.drawImage(this.image, this.farmeX* this.width , 0 , this.width, this.height, this.x, this.y, this.width, this.height)
    }
}
export class FlyingEnemy extends Enemy{
    constructor(game){
        super(game);
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.maxFarme = 4;
        this.x = this.game.width + Math.random()*this.game.width*0.5;
        this.y = Math.random() * this.game.height * 0.3;
        this.speedX = Math.random() +2
        this.speedY = 0;
        this.image = document.getElementById("enemyFly")
        this.angle = 0;
        this.va = Math.random()*0.1+0.1
    }
    update(deltatime){
        super.update(deltatime)
        this.angle += this.va;
        this.y += (Math.random()*5+1) *Math.sin(this.angle)
    }
}

export class GroundEnemy extends Enemy{
    constructor(game) {
        super(game);
        this.game = game ;
        this.width = 60
        this.height = 87;
        this.x = this.game.width - this.width
        this.y = this.game.height - this.height - this.game.groundMargin
        this.image = document.getElementById('plant')
        this.maxFarme = 0
        this.speedX = 3
        this.speedY = 0
    }
}
export class ClimbingEnemy extends Enemy{
    constructor(game) {
        super(game);
        this.game = game ;
        this.width = 120
        this.height = 144;
        this.x = this.game.width
        this.y = Math.random() * this.game.height*0.5
        this.image = document.getElementById('spiderBig')
        this.maxFarme = 0
        this.speedX = 2
        this.speedY = Math.random() > 0.5 ? 1 : -1 
        this.maxFarme = 4
    }
    update(deltatime){
        super.update(deltatime)
        if( this.y > this.game.height - this.height - this.game.groundMargin ) this.speedY = -1
        if ( this.y < - this.height ) this.markedForDelection = true
    }
    draw(context) {
        super.draw(context)
        context.beginPath()
        context.moveTo(this.x+this.width/2, 0 );
        context.lineTo(this.x+this.width/2, this.y);
        context.stroke()
    }
}