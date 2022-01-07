import { Point } from "./Point.js"
import { Vector } from "./Vector.js"

export function Entity(engine, pos, velocity)
{
    "use strict"

	this.engine = engine
	this.pos = pos ?? new Point()
	this.velocity = velocity ?? new Vector()
}

Entity.prototype.getVelocity = function()
{
    "use strict"

	return this.velocity
}

Entity.prototype.draw = function(ctx)
{
    "use strict"

	ctx.fillStyle = "black"
	ctx.fillRect(this.pos.x, this.pos.y, 5, 5)
}

Entity.prototype.tick = function(progress)
{
    "use strict"

	this.pos.x += this.getVelocity().x * progress
	this.pos.y += this.getVelocity().y * progress
}

Entity.prototype.contains = function(point)
{
    "use strict"

	return false
}

// vec and pos act as passed by reference
Entity.prototype.reflectVector = function(vec, pos, pos_radius, progress)
{
    "use strict"


}

