import {Draw} from "./graphics.js"

export class Spaceship{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.screenX
        this.screenY
        this.velX = 0
        this.velY = 0
        this.accX = 0
        this.accY = 0
        this.friction = 0.92
        this.image = new Image()
        this.image.src = "ship.png"
        this.rotation = 0; // Rotation angle in radians
        this.scale = 0.1; // Scale factor
        this.color = "red"
    }

    draw(){
        Draw.image(this.image,this.screenX,this.screenY,this.rotation,this.scale,this.scale)
    }

    update(){

        this.screenX = this.x - camera.x
        this.screenY = this.y - camera.y

        this.velX += deltaX*0.1
        this.velY += deltaY*0.1


        this.x -= this.velX
        this.y -= this.velY

        this.velX *= this.friction
        this.velY *= this.friction
    }
}