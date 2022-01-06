import { Entity } from "./Entity.js"

const proto = Entity.prototype

export function Ball(engine, pos, velocity)
{
	"use strict"
	Entity.call(this, engine, pos, velocity)
	this.size = 5
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
	// instead this, use the reflectVector of otehr entities:	
	if(this.pos.x > this.engine.w)
		this.velocity.x = -Math.abs(this.velocity.x)
	//if(this.pos.y > this.engine.h)
	//	this.velocity.y = -Math.abs(this.velocity.y)
	if(this.pos.y < 0)
		this.velocity.y = Math.abs(this.velocity.y)
	if(this.pos.x < 0)
		this.velocity.x = Math.abs(this.velocity.x)

	const player = this.engine.player
	if(this.pos.y > player.pos.y &&
		this.pos.y < player.pos.y + player.h &&
		this.pos.x > player.pos.x &&
		this.pos.x < player.pos.x + player.w)
	{
		this.velocity.y = -Math.abs(this.velocity.y)
	}


	proto.tick.call(this, progress)
}
