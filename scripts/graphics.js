// Get a reference to the canvas container div
var canvasContainer = document.getElementById("canvasContainer");

// Create a new canvas element
var canvas = document.createElement("canvas");

// Set the canvas size to match the container size
canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;

// Append the canvas to the container
canvasContainer.appendChild(canvas);

var ctx = canvas.getContext("2d")

export var Screen = {
    w:canvas.width,
    h:canvas.height
}

export class Draw {
    static Object(obj){
        if(obj.display == 'image'){
            this.image(obj.image,obj.x,obj.y,obj.angle,obj.scaleX,obj.scaleY)
        }
        else if (obj.display == 'circle'){
            this.circle(obj.x,obj.y,obj.radius,obj.color)
        }
        else if (obj.display == 'rectangle'){
            this.rectangle(obj.x,obj.y,obj.w,obj.h,obj.color)
        }
    }
    static circle(x,y,radius,color){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    static rectangle(x,y,w,h,color){
        ctx.beginPath();
        ctx.rect(x,y,w,h)
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    static line(x1,y1,x2,y2,w,color){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = w;
        ctx.stroke();
        ctx.closePath();
    }
    static text(text,x,y,font,color){
        ctx.beginPath();
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.closePath();
    }
    static image(image,x,y,angle,scaleX,scaleY){
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(angle);
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
    }

    static clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}