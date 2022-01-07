import { Point } from "./Point.js"

export function Rect(pos, w, h)
{
    "use strict"
    this.pos = pos ?? new Point()
    this.w = w ?? 0
    this.h = w ?? 0

    Object.defineProperty(this, "width", {
        get: () => this.w,
        set(v) { this.w = v }
    })
    
    Object.defineProperty(this, "height", {
        get: () => this.h,
        set(v) { this.h = v }
    })

}

Rect.prototype.contains = function(point)
{
    "use strict"

    if(point.x < this.pos.x) return false
    if(point.y < this.pos.y) return false
    if(point.x > this.pos.x + this.w) return false
    if(point.y > this.pos.y + this.h) return false

    return true
}
