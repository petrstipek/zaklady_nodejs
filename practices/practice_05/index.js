import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono()

app.get((context, next) => {
    //return context.html("<h1>Hello, World</h1>")
    console.log(context.req.method, context.req.url)
    next()

})

app.get("/", (context) => {
    return context.html("<h1>Hello, World!</h1>")
})

app.get("/hello/:name", (context) => {
    const name = context.req.param("name")
    return context.html(`<h1>Hello, ${name}</h1>`)
})

app.use((context) => {
    context.status(404)
    return context.html("<h1>Page not found!</h1>")
})

serve({
    fetch: app.fetch,
    port: 8000
})