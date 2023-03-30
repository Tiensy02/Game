export class FloatingMessage {
    constructor(value,x,y,tagerX,tagerY) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.tagerX = tagerX;
        this.tagerY = tagerY;
        this.markedForDelection = false 
        this.timer = 0 ;
    }
    update() {
        this.x+=    (this.tagerX - this.x)*0.03 
        this.y+= (this.tagerY - this.y) * 0.03
        this.timer++
        if ( this.timer > 100 ) {
            this.markedForDelection = true
        }
    }
    draw(ctx) {
        ctx.font = '20px Delicious Handrawn'
        ctx.fillStyle = 'white'
        ctx.fillText(this.value, this.x,this.y) 
        ctx.fillStyle = 'black'
        ctx.fillText(this.value, this.x -2 , this.y -2 )
    }
}