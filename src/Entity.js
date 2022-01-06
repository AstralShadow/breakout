import { Point } from "./Point.js"
import { Vector } from "./Vector.js"

export function Entity(engine, pos, velocity)
{
	this.engine = engine
	this.pos = pos ?? new Point()
	this.velocity = velocity ?? new Vector()
}

Entity.prototype.getVelocity = function()
{
	return this.velocity
}

Entity.prototype.draw = function(ctx)
{
	ctx.fillStyle = "black"
	ctx.fillRect(this.pos.x, this.pos.y, 5, 5)
}

Entity.prototype.tick = function(progress)
{
	this.pos.x += this.getVelocity().x * progress
	this.pos.y += this.getVelocity().y * progress
}

Entity.prototype.contains = function(point){
	return false
}

Entity.prototype.reflectVector = function(vec, pos)
{
	return vec
}

