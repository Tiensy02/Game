export class UI {
     constructor(game) {
        this.game = game;
        this.fontSize = 30
        this.fontFamily = 'Delicious Handrawn'
        this.livesImage = document.getElementById("live")
     }
     draw(context) {
      context.save()
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowBlur = 0
        context.shadowColor = "white"
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillStyle = 'black';
        context.fillText('Score ' + this.game.score, 20, 50);
        // timer
        context.font = this.fontSize*0.8 + 'px ' +this.fontFamily 
        context.fillStyle = 'black';
        context.fillText('Time: '+ (this.game.time*0.001).toFixed(1), 20, 80);
        //lives
        for ( let i = 0 ; i < this.game.maxLives ; i ++ ) {
           context.drawImage(this.livesImage,20+25*i,95,25,25)
        }
        //gameOver 
        if ( this.game.gameOver ) {
         context.font = this.fontSize * 2 + 'px ' + this.fontFamily
         context.fillStyle = 'black';
         context.textAlign = 'center';
         context.fillText('Game Over', this.game.width*0.5, this.game.height * 0.5);
         context.fillText('Press F2 to restart ', this.game.width*0.5, this.game.height * 0.5+60);
        }
        context.restore()
     }
}