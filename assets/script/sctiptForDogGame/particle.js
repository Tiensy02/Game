class Particle {
    constructor(game ) {
        this.game = game;
        this.markedForDelection = false;
    }
    update() {
        this.x -= this.SpeedX+this.game.speed
        this.y -= this.SpeedY
        this.size *= 0.95  
        if ( this.size < 0.5 ) this.markedForDelection = true  
    }

}
export class Dust extends Particle {
    constructor(game,x,y) {
        super(game) 
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 +10
            this.SpeedX = Math.random();
            this.SpeedY = Math.random();
            this.color = 'rgba(0,0,0,0.4)'
        }

    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill(); 
    }
}
export class Fire extends Particle {
    constructor(game,x,y) {
        super(game) 
            this.x = x;
            this.y = y;
            this.size = Math.random() * 100 +100
            this.SpeedX = 1;
            this.SpeedY = 1;
            this.image = document.getElementById("fire")
        }

    
    draw(ctx) {
        ctx.drawImage(this.image, this.x-this.size*0.5,this.y-this.size*0.5,this.size,this.size)
    }
}
export class Splash extends Particle {
    constructor(game,x,y) {
        super(game) 
            this.size = Math.random() * 100 +100
            this.x = x - this.size * 0.4;
            this.y = y - this.size * 0.6;
            this.SpeedX = Math.random() *6 -3;
            this.SpeedY = Math.random()*2 +2;
            this.image = document.getElementById("fire")
            this.gravity = 0
        }
        update(){
            super.update()
            this.gravity += 0.1
            this.y += this.gravity
        }
    draw(ctx) {
        ctx.drawImage(this.image, this.x,this.y,this.size,this.size)
    }
}
