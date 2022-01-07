import { Entity } from "../Entity.js"
import { Rect, Point } from "../Geometry.js"

const base = Entity

export function Brick(engine, pos, w, h)
{
    "use strict"
    base.call(this, engine)
    this.area = new Rect(pos, w, h)
    this.color = "brown"
    this.border = "black"
    this.hp = 1

    Object.defineProperty(this, "pos", {
        get: () => this.area.pos,
        set(v){ this.area.pos = v }
    })

    const w_property = {
        get: () => this.area.w,
        set(v){ this.area.w = v }
    }
    Object.defineProperty(this, "w", w_property)
    Object.defineProperty(this, "width", w_property)

    const h_property = {
        get: () => this.area.h,
        set(v){ this.area.h = v }
    }
    Object.defineProperty(this, "h", h_property)
    Object.defineProperty(this, "height", h_property)

}

Brick.prototype = Object.create(base.prototype)

Brick.prototype.draw = function(ctx)
{
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.border

    ctx.fillRect(
        this.area.pos.x,
        this.area.pos.y,
        this.area.w,
        this.area.h
    )

    ctx.strokeRect(
        this.area.pos.x,
        this.area.pos.y,
        this.area.w,
        this.area.h
    )
}

Brick.prototype.remove = function()
{
    const i = this.engine.entities.indexOf(this)
    this.engine.entities.splice(i, 1)
}

Brick.prototype.contains = function(point)
{
    "use strict"

    return this.area.contains(point)
}

Brick.prototype.reflectVector = function(vec, pos, radius, progress)
{
    const x = this.pos.x
    const y = this.pos.y
    const w = this.w
    const h = this.h
    var vec2 = vec.copy()
    vec2.x *= progress
    vec2.y *= progress
    const old_pos = pos.copy().substract(vec2)
    var hit_flag = false

    console.log(x, y, w, h, "pos", pos.x, pos.y, "old_pos", old_pos.x, old_pos.y)
    if ((pos.x > x && old_pos.x < x) ||
        (pos.x < x + w && old_pos.x > x + w))
    {
        vec.x = -vec.x
        hit_flag = true
    }

    if ((pos.y > y && old_pos.y < y) ||
        (pos.y < y + h && old_pos.y > y + h))
    {
        vec.y = -vec.y
        hit_flag = true
    }

    if(hit_flag)
    {
        this.hp--
        if(this.hp <= 0)
            this.remove()
    }
}

