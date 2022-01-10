import { Vector } from "../Geometry.js"

export const wasd_velocity = new Vector()
const wasd_pressed = [0, 0, 0, 0] // w, a, s, d
const wasd_keys = [[87, 38], [65, 37], [83, 40], [68, 39]]
const calculate_wasd_velocity = () =>
{
	wasd_velocity.x = 0
	wasd_velocity.y = 0

	if(wasd_pressed[0]) wasd_velocity.y--
	if(wasd_pressed[1]) wasd_velocity.x--
	if(wasd_pressed[2]) wasd_velocity.y++
	if(wasd_pressed[3]) wasd_velocity.x++
}

["keyup", "keydown"].forEach(w =>
    document.addEventListener(w, (e) =>
    {
        for(let i = 0; i < 4; i++)
            if(wasd_keys[i].indexOf(e.keyCode) != -1)
                wasd_pressed[i] = (w == "keydown")

        calculate_wasd_velocity()
        e.preventDefault()
    })
)

