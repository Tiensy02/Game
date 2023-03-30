import { Dust,Fire,Splash } from "./particle.js";
const states = {
    SITTING : 0, 
    RUNNING : 1,
    JUMPING : 2,
    FALLING :3,
    ROLLING: 4,
    DIVING:5,
    HIT: 6,
    STANDDING :7,


}
class State {
    constructor(state,game) {
        this.state = state;
        this.game = game
    }
}
export class Sitting extends State {
    constructor(game) {
        super('SITTING',game)
        
    }
    enter() {
        this.game.player.farmeX = 0
        this.game.player.farmeY  = 5
        this.game.player.maxFarmeX = 3

    }
    handleInput(input) {
        if (input.includes('ArrowLeft')|| input.includes('ArrowRight') || input.includes('a') || input.includes('d') ) {
            this.game.player.setState(states.RUNNING,1)
        }
        else if (input.includes("ArrowUp")|| input.includes('w')) {
        this.game.player.setState(states.STANDDING,0)
        } else if(input.includes("Enter")) {
            this.game.player.setState(states.ROLLING,2)
        }
    }
}
export class Running extends State{
    constructor(game) {
        super('RUNNING',game)
    }
    enter() {
        this.game.player.farmeX = 0
        this.game.player.farmeY  = 3
        this.game.player.maxFarmeX = 7
    }
    handleInput(input) {
        this.game.particles.unshift(new Dust(this.game,this.game.player.x+this.game.player.width*0.6,this.game.player.y+this.game.player.height))
        if (input.includes('ArrowDown')|| input.includes('s')) {
            this.game.player.setState(states.SITTING,0)
        } else if (input.includes('ArrowUp')|| input.includes('w')) {
            this.game.player.setState(states.JUMPING,1)
        }else if(input.includes("Enter")) {
            this.game.player.setState(states.ROLLING,2)
        }
    }
}
export class Jumping extends State{
    constructor(game) {
        super('JUMPING',game)
    }
    enter() {
        this.game.player.farmeX = 0

        this.game.player.farmeY  = 1
        this.game.player.maxFarmeX = 5
        if (this.game.player.onGround() ) this.game.player.vy -= 27
    }
    handleInput(input) {
        if(this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING,1)
        }else if(input.includes("Enter")) {
            this.game.player.setState(states.ROLLING,2)
        } else if (input.includes("ArrowDown")|| input.includes('s')){
            this.game.player.setState(states.DIVING,0)
        }
    }
}

export class Standding extends State{
    constructor(game) {
        super('STANDDING',game)
    }
    enter() {
        this.game.player.farmeX = 0
        this.game.player.farmeY = 0
        this.game.player.maxFarmeX = 5
    }   
    handleInput(input) {
         if (input.includes('ArrowUp')|| input.includes('w')) {
            this.game.player.setState(states.JUMPING,1)
         }else if(input.includes('ArrowDown')|| input.includes('s')) this.game.player.setState(states.SITTING,0)

        }
}
export class Falling extends State{
    constructor(game) {
        super('FALLING',game)
    }
    enter() {
        this.game.player.farmeX = 0

        this.game.player.farmeY  = 2
        this.game.player.maxFarmeX = 5
    }   
    handleInput(input) {
      if(this.game.player.onGround()) {
        this.game.player.setState(states.RUNNING,1)
      }
    }
}
export class Rolling extends State{
    constructor(game) {
        super('ROLLING',game)
    }
    enter() {
        this.game.player.farmeX = 0
        this.game.player.farmeY  = 6
        this.game.player.maxFarmeX = 5
    }   
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height*0.5))
        if(!input.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1)
        } else if (!input.includes("Enter") && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,1)
        } else if ( input.includes("Enter") && (input.includes("ArrowUp" )|| input.includes('w')) && this.game.player.onGround()) {
            this.game.player.vy -= 27
        }
    } 
}
export class Diving extends State{
    constructor(game) {
        super('DIVING',game)
    }
    enter() {
        this.game.player.farmeX = 0
        this.game.player.farmeY  = 6
        this.game.player.maxFarmeX = 5
        this.game.player.vy = 15
    }   
    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x+this.game.player.width*0.5,this.game.player.y+this.game.player.height*0.5))
        if(this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1)
            for(let i = 0 ; i < 30 ; i ++ ) {
                this.game.particles.unshift(new Splash(this.game, this.game.player.x+ this.game.player.width*0.5  , this.game.player.y+this.game.player.height))
            }
        } else if (input.includes("Enter") && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING,2)
        } 
    } 
}
export class Hit extends State{
    constructor(game) {
        super('HIT',game)
    }
    enter() {
        this.game.player.farmeX = 0
        this.game.player.farmeY  = 4
        this.game.player.maxFarmeX = 9
    }   
    handleInput(input) {
        if(this.game.player.farmeX >= 9 &&this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1)
        } else if ( this.game.player.farmeX >= 9 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING,2)
        }
    } 
}
    

