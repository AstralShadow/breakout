import { Entity } from "./Entity.js"
import { Vector } from "./Vector.js"

const proto = Entity.prototype

export function Ball(engine, pos, velocity)
{
	"use strict"
	Entity.call(this, engine, pos, velocity)
	this.size = 7
	this.color = "black"
}

Ball.prototype = Object.create(proto)

Ball.prototype.draw = function(ctx)
{
	ctx.beginPath()
	ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, 2 * Math.PI)
	ctx.fillStyle = this.color
	ctx.fill()
}

Ball.prototype.tick = function(progress)
{
	if(this.pos.x > this.engine.w)
		this.velocity.x = -Math.abs(this.velocity.x)
	//if(this.pos.y > this.engine.h)
	//	this.velocity.y = -Math.abs(this.velocity.y)
	if(this.pos.y < 0)
		this.velocity.y = Math.abs(this.velocity.y)
	if(this.pos.x < 0)
		this.velocity.x = Math.abs(this.velocity.x)

	proto.tick.call(this, progress)

    var index = this.engine.entities.indexOf(this)
    this.engine.entities.forEach((e, i) => 
    {
        if(e == this) return;
        if(!e.contains(this.pos)) return;
        if(e instanceof Ball && i > index) return;

        e.reflectVector(this.velocity, this.pos, this.size, progress)
    })
}

Ball.prototype.contains = function(point)
{
    return this.pos.distance(point) <= this.size
}

Ball.prototype.reflectVector = function(vel, pos)
{
    if(!this.contains(pos))
        return;
    
    const distance_now = this.pos.distance(pos)
    const this_pos = this.pos.copy().add(this.velocity)
    const other_pos = pos.copy().add(vel)
    const distance_later = this_pos.distance(other_pos)

    if(distance_later > distance_now) return;

    const vel_copy = vel.copy()
    const this_vel_copy = this.velocity.copy()
    vel.direction = this.velocity.direction

    this.velocity.direction = vel_copy.direction

    vel_copy.distance *= 0.1
    this_vel_copy.distance *= 0.1
    
    const this_original_distance = this.velocity.distance
    this.velocity.add(this_vel_copy)
    this.velocity.distance = this_original_distance
    const vel_original_distance = vel.distance
    vel.add(vel_copy)
    vel.distance = vel_original_distance
}
