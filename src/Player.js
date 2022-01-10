import { Entity } from "./Entity.js"
import { Vector } from "./Vector.js"
import { Point } from "./Point.js"

const proto = Entity.prototype
const wasd_movement = new Vector()
const wasd_pressed = [0, 0, 0, 0] // w, a, s, d
const wasd_keys = [[87, 38], [65, 37], [83, 40], [68, 39]]
const calculate_wasd_movement = () =>
{
	wasd_movement.x = 0
	wasd_movement.y = 0

	if(wasd_pressed[0]) wasd_movement.y--
	if(wasd_pressed[1]) wasd_movement.x--
	if(wasd_pressed[2]) wasd_movement.y++
	if(wasd_pressed[3]) wasd_movement.x++
}

["keyup", "keydown"].forEach(w =>
    document.addEventListener(w, (e) =>
    {
        for(let i = 0; i < 4; i++)
            if(wasd_keys[i].indexOf(e.keyCode) != -1)
                wasd_pressed[i] = (w == "keydown")

        calculate_wasd_movement()
        e.preventDefault()
    })
)

export function Player(engine, pos)
{
	"use strict"
	Entity.call(this, engine, pos ?? new Point(engine.w / 2 - 40, engine.h - 20), wasd_movement)

	this.w = 80
	this.h = 10
	this.color = "black"
}

Player.prototype = Object.create(proto)

Player.prototype.tick = function(progress)
{
	proto.tick.call(this, progress / 4)
	if(this.pos.y < this.engine.h - 50)
		this.pos.y = this.engine.h - 50
	if(this.pos.y > this.engine.h - this.h)
		this.pos.y = this.engine.h - this.h
	if(this.pos.x > this.engine.w - this.w)
		this.pos.x = this.engine.w - this.w
	if(this.pos.x < 0)
		this.pos.x = 0
}

Player.prototype.draw = function(ctx)
{
	ctx.fillStyle = this.color
	ctx.fillRect(this.pos.x + 2.5, this.pos.y, this.w, this.h - 5)
}

Player.prototype.contains = function(point)
{
	if(this.pos.x > point.x) return false;
	if(this.pos.y > point.y) return false;
	if(this.pos.x + this.w < point.x) return false;
	if(this.pos.y + this.h < point.y) return false;
	return true;
}

Player.prototype.reflectVector = function(vel, pos)
{
	if(!this.contains(pos)) return;

    vel.y = -Math.abs(vel.y)

    if(pos.y > this.pos.y){
        pos.y = this.pos.y
    }

    if(this.velocity.x != 0)
        vel.x = (vel.x * 2 + this.velocity.x / 4) / 3
    if(this.velocity.y != 0)
    vel.y = (vel.y * 2 + this.velocity.y / 4) / 3
}
