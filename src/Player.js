import { Entity } from "./Entity.js"
import { Vector } from "./Vector.js"
import { Point } from "./Point.js"

const proto = Entity.prototype
const wasd_movement = new Vector()
const wasd_pressed = [0, 0, 0, 0] // w, a, s, d
const calculate_wasd_movement = () =>
{
	wasd_movement.x = 0
	wasd_movement.y = 0

	if(wasd_pressed[0]) wasd_movement.y--
	if(wasd_pressed[1]) wasd_movement.x--
	if(wasd_pressed[2]) wasd_movement.y++
	if(wasd_pressed[3]) wasd_movement.x++
}

document.addEventListener("keydown", (e) =>
{
	switch(e.keyCode)
	{
		case 87: // w
			wasd_pressed[0] = true
			break;
		case 65: // a
			wasd_pressed[1] = true
			break;
		case 83: // s
			wasd_pressed[2] = true
			break;
		case 68: // d
			wasd_pressed[3] = true
			break;
	}
	calculate_wasd_movement()
})

document.addEventListener("keyup", (e) =>
{
	switch(e.keyCode)
	{
		case 87: // w
			wasd_pressed[0] = false
			break;
		case 65: // a
			wasd_pressed[1] = false
			break;
		case 83: // s
			wasd_pressed[2] = false
			break;
		case 68: // d
			wasd_pressed[3] = false
			break;
	}
	calculate_wasd_movement()
})

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
	if(this.pos.x + this.w < ponit.x) return false;
	if(this.pos.y + this.h < ponit.y) return false;
	return true;
}

Player.prototype.reflectVector = function(vel, pos)
{
	if(this.contains(pos))
		vel.y = -Math.abs(vel.y)
	return vel
}
