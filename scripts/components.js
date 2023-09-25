
import {Draw} from "./graphics.js"

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');


export class GameObject{
    constructor(params){
        this.type = params.type
    }

}

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

class Star{
    constructor(x,y,radius,color,speedMultiplier){
        this.x = x;
        this.y = y;
        this.screenX
        this.screenY
        this.velX = 0
        this.velY = 0
        this.radius=radius;
        this.color=color;
        this.friction = 0.92
        this.speedMultiplier = speedMultiplier
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.radius,this.radius)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){


        /*this.velX += deltaX*0.1*this.speedMultiplier
        this.velY += deltaY*0.1*this.speedMultiplier

        this.x += this.velX
        this.y += this.velY

        this.velX *= this.friction
        this.velY *= this.friction*/

        if(this.x < 0){
            this.x = canvas.width
            this.y = Math.random()*canvas.height
        }
        if(this.x > canvas.width){
            this.x = 0
            this.y = Math.random()*canvas.height
        }
        if(this.y < 0){
            this.y = canvas.height
            this.x = Math.random()*canvas.width
        }
        if(this.y > canvas.height){
            this.y = 0
            this.x = Math.random()*canvas.width
        }

    }
}
class Planet{
    constructor(x,y,radius,color){
        this.x= x
        this.y= y
        this.velX = 0
        this.velY = 0
        this.radius=radius;
        this.color=color;
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x-camera.x,this.y-camera.y,this.radius,this.radius)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){

    }
}

class Camera {
    constructor(x,y){
        this.x = x
        this.y = y
        this.easing = 0.1; // Adjust this value to control the smoothness (lower values are smoother)
    }

    follow(target) {
        /*// Calculate the desired camera position centered on the target
        const targetX = target.x - canvas.width / 2;
        const targetY = target.y - canvas.height / 2;

        // Use easing to smoothly interpolate towards the target position
        this.x += (targetX - this.x) * this.easing;
        this.y += (targetY - this.y) * this.easing;
*/
        this.x = target.x-canvas.width/2
        this.y = target.y-canvas.height/2
    }
}
class Minimap {
    constructor(){
        this.weight
        this.x
        this.y
        this.w
        this.h
        this.indicator

    }
    drawMap(){
    
        this.weight = (canvas.width + canvas.height)/2

        this.x = canvas.width -this.weight/3.5
        this.y = canvas.height -this.weight/3.5
    
        this.w = this.weight/4
        this.h = this.weight/4

        ctx.beginPath();
        ctx.strokeStyle = "grey";
                
        // Set the stroke width
        ctx.lineWidth = 2;
        
        // Draw the empty rectangle
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.closePath();

    }
    drawIndicator(obj){
    
        
        this.indicator = {
            x: (this.w/world.width)*obj.x+this.x,
            y: (this.h/world.height)*obj.y+this.y,
            color: obj.color
        }
    
        ctx.beginPath();
        ctx.rect(this.indicator.x,this.indicator.y,5,5)
        ctx.fillStyle = this.indicator.color;
        ctx.fill();
        ctx.closePath();

    }
}


class Starsystem{
    constructor(maxStars=20,minStars=5,minSize=2,maxSize=6,layers=3){

        this.maxNumStars = maxStars // Max number per layer (smaller/further layer)

        this.minNumStars = minStars // Min number per layer (bigger/closer layer)

        this.minStarSize = minSize

        this.maxStarSize = maxSize

        this.layers = layers

        this.bit = (this.maxNumStars - this.minNumStars)/(this.layers-1)


        this.stars = []
    }

    setup(){

        //let screenX = camera.x-world.width/2
        //let screenY = camera.y-world.height/2

        for(let i = 0; i < this.layers; i++){

            let newLayer = []
            let numStars = this.maxNumStars-this.bit*i // The number of stars on this layer
            let starSize = (this.maxStarSize/this.layers)*i+this.minStarSize

            for(let j = 0;j < numStars; j++){
            
                let scrX  = Math.random() * canvas.width;
                let scrY = Math.random() * canvas.height;

            
                let currentStar = {screenX:scrX, screenY:scrY, size:starSize};
                newLayer.push(currentStar);
            }
            this.stars.push(newLayer)
        }
    }

    draw(star){

        //let cameraOffsetX = camera.x-world.width/2+canvas.width/2 // Camera offset to center X
        //let cameraOffsetY = camera.y-world.height/2+canvas.height/2 // Camera offset to center Y


        ctx.beginPath();
        ctx.rect(
            star.screenX,
            star.screenY,
            star.size,star.size)
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }

    update(star){
        let sm = star.size/this.maxStarSize // Speed multiplier depending on layer

        star.screenX += spaceship.velX*sm
        star.screenY += spaceship.velY*sm

        if(star.screenX < 0){
            star.screenX = canvas.width
            star.screenY = (Math.random()*canvas.height)
        }
        if(star.screenX > canvas.width){
            star.screenX = 0
            star.screenY = (Math.random()*canvas.height)
        }
        if(star.screenY < 0){
            star.screenY = canvas.height
            star.screenX = (Math.random()*canvas.width)
        }
        if(star.screenY > canvas.height){
            star.screenY = 0
            star.screenX = (Math.random()*canvas.width)
        }

    }

}

export class Camera {
    constructor(x,y,easing=1){
        this.x = x
        this.y = y
        this.easing = easing; // Adjust this value to control the smoothness (lower values are smoother)
    }

    follow(target) {
        // Calculate the desired camera position centered on the target
        const targetX = target.x - canvas.width / 2;
        const targetY = target.y - canvas.height / 2;

        // Use easing to smoothly interpolate towards the target position
        this.x += (targetX - this.x) * this.easing;
        this.y += (targetY - this.y) * this.easing;

        this.x = target.x-canvas.width/2
        this.y = target.y-canvas.height/2
    }
}

export class Minimap {
    constructor(){
        this.weight
        this.x
        this.y
        this.w
        this.h
        this.indicator

    }
    drawMap(){
    
        this.weight = (canvas.width + canvas.height)/2

        this.x = canvas.width -this.weight/3.5
        this.y = canvas.height -this.weight/3.5
    
        this.w = this.weight/4
        this.h = this.weight/4

        ctx.beginPath();
        ctx.strokeStyle = "grey";
                
        // Set the stroke width
        ctx.lineWidth = 2;
        
        // Draw the empty rectangle
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.closePath();

    }
    drawIndicator(obj){
    
        
        this.indicator = {
            x: (this.w/world.width)*obj.x+this.x,
            y: (this.h/world.height)*obj.y+this.y,
            color: obj.color
        }
    
        ctx.beginPath();
        ctx.rect(this.indicator.x,this.indicator.y,5,5)
        ctx.fillStyle = this.indicator.color;
        ctx.fill();
        ctx.closePath();

    }
}

export var Components = {Camera,Minimap}