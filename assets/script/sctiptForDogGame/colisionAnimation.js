export class ColisionAnimation {
    constructor(game,x,y){
        this.game = game;
        this.image = document.getElementById('colisionAnimation')
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5 ;
        this.width = this.spriteWidth * this.sizeModifier
        this.height = this.spriteHeight * this.sizeModifier
        this.x = x - this.width *0.5
        this.y = y - this.height *0.5
        this.farmeX = 0 ;
        this.maxFarme = 3
        this.markedForDelection = false
        this.fps = 20;
        this.farmeTimer = 0 ;
        this.farmeTimeInterval = 1000/ this.fps
    }
    draw(ctx) {
        ctx.drawImage(this.image,this.farmeX*this.spriteWidth,0,this.spriteWidth ,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
    update(deltatime){
        this.x -= this.game.speed
        if( this.farmeTimer > this.farmeTimeInterval ) {
            if(this.farmeX > this.maxFarme ) {
                this.markedForDelection = true
            } else this.farmeX ++
            this.farmeTimer= 0
        } else this.farmeTimer += deltatime
    }
}