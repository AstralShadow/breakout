import { Player } from "./Player.js"
import { Ball } from "./Ball.js"
import { Point, Vector } from "./Geometry.js"
import { Brick } from "./Obstacles.js"

export function Engine(ctx)
{
	"use strict"

	this.ctx = ctx
	Object.defineProperty(this, 'w', {get(){return this.ctx.canvas.width}})
	Object.defineProperty(this, 'h', {get(){return this.ctx.canvas.height}})
	
	this.player = new Player(this)
	this.entities = [this.player]

	for(let i = 0; i < 1; i++)
	{
		let pos = new Point(this.ctx.canvas.width / 2,// + Math.random() * 500 - 250,
							this.ctx.canvas.height - 20)// - Math.random() * 500)
		let velocity = new Vector()
		velocity.direction = Math.PI + Math.floor(Math.random() * 16) / 16 * Math.PI
		velocity.distance = 0.2
		this.entities.push(new Ball(this, pos, velocity))
	}

    var brick_x = 22.5
    var brick_y = 30
    var brick_width = 25
    var brick_height = 10
    var brick_margin = 5

    for(let y = 0; y < 10; y++)
    {
        for(let x = 0; x < 20; x++)
        {
            let pos = new Point(brick_x, brick_y)
            let brick = new Brick(this, pos, brick_width, brick_height)
            this.entities.push(brick)
            brick_x += brick_margin + brick_width
        }
        brick_x = 22.5
        brick_y += brick_margin + brick_height
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
