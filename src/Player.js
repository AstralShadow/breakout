import { Entity } from "./Entity.js"
import { Vector } from "./Vector.js"
import { Point } from "./Point.js"
import { wasd_velocity } from "./Controls/wasd.js"

const proto = Entity.prototype

export function Player(engine, pos)
{
	"use strict"
	Entity.call(this, engine, pos ?? new Point(engine.w / 2 - 40, engine.h - 20), wasd_velocity)

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
