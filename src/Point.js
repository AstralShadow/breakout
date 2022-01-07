export function Point(x, y)
{
	"use strict"

	this.x = x ?? 0
	this.y = y ?? 0
}

Point.prototype.distance = function(p)
{
    "use strict"

	return Math.hypot(p.x - this.x, p.y - this.y)
}

Point.prototype.copy = function()
{
    "use strict"

    return new Point(this.x, this.y)
}

Point.prototype.add = function(other)
{
    "use strict"

    this.x += other.x
    this.y += other.y
    return this
}

Point.prototype.substract = function(other)
{
    "use strict"

    this.x -= other.x
    this.y -= other.y
    return this
}
