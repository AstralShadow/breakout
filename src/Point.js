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
