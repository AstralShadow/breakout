export function Point(x, y)
{
	"use strict"

	this.x = x ?? 0
	this.y = y ?? 0
}

Point.prototype.distance = function(p)
{
	return Math.hypot(p.x - this.x, p.y - this.y)
}

Point.prototype.copy = function()
{
    return new Point(this.x, this.y)
}

Point.prototype.add = function(other)
{
    this.x += other.x
    this.y += other.y
    return this
}
