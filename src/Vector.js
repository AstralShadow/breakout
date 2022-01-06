export function Vector(direction, distance)
{
	"use strict"
	this.direction = direction ?? 0
	this.distance = distance ?? 0

	Object.defineProperty(this, "x", {
		get(){
			return Math.cos(this.direction) * this.distance
		},
		set(x)
		{
			const y = this.y;
			this.direction = Math.atan2(y, x)
			this.distance = Math.hypot(x, y)
		}
	})

	Object.defineProperty(this, "y", {
		get(){
			return Math.sin(this.direction) * this.distance
		},
		set(y)
		{
			const x = this.x;
			this.direction = Math.atan2(y, x)
			this.distance = Math.hypot(x, y)
		}
	})
}

Vector.prototype.copy = function()
{
	return new Vector(this.direction, this.distance)
}

Vector.prototype.add = function(other)
{
	this.x += other.x
	this.y += other.y
}
