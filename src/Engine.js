import { Player } from "./Player.js"
import { Ball } from "./Ball.js"
import { Point } from "./Point.js"
import { Vector } from "./Vector.js"

export function Engine(ctx)
{
	"use strict"

	this.ctx = ctx
	Object.defineProperty(this, 'w', {get(){return this.ctx.canvas.width}})
	Object.defineProperty(this, 'h', {get(){return this.ctx.canvas.height}})
	
	this.player = new Player(this)
	this.entities = [this.player]

	for(let i = 0; i < 10; i++)
	{
		let pos = new Point(this.ctx.canvas.width / 2 + Math.random() * 500 - 250,
							this.ctx.canvas.height - 20 - Math.random() * 500)
		let velocity = new Vector()
		velocity.direction = Math.PI + Math.floor(Math.random() * 16) / 16 * Math.PI
		velocity.distance = 0.2
		this.entities.push(new Ball(this, pos, velocity))
	}

	const now = () => (new Date()).getTime()

	var lastTime = now()
	var counter = 0
	const halfFPS = !true
	const loop = () =>
	{
		counter++
		window.requestAnimationFrame(loop)

		var diff = now() - lastTime
		lastTime = now()
		
		this.tick(diff)
		if(!halfFPS || counter % 2)
			this.draw(this.ctx)
	}

	loop()

}

Engine.prototype.tick = function(progress)
{
	"use strict"
	this.entities.forEach(e => e.tick(progress))
}

Engine.prototype.draw = function(ctx)
{
	"use strict"
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	this.entities.forEach(e => e.draw(ctx))
}
