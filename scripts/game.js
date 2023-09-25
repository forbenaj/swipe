import Bengine from "./bengine.js"

import {Draw} from "./graphics.js"
import Components from "./components.js"

camera = new Bengine.Camera()

player = new Bengine.GameObject({
    type:'player',
    display: 'image',
    imageSrc: 'ship.png',
    controls: 'touch'
})

player.imageSrc = "ship.png"



starsystem = new Bengine.Cosmetic()

function Mainloop(){

}