import { Hono } from "hono";
import { serve } from "@hono/node-server";
import ejs from "ejs"

const app = new Hono()

let todos = [
    {
    id: 1,
    title: "Go to the shop",
    done: true
    }, 
    {
    id: 2,
    title: "Do a bike ride",
    done: false,
    }
]

app.get(async (context, next) => {
    //return context.html("<h1>Hello, World</h1>")
    console.log(context.req.method, context.req.url)
    await next()
})

app.get("/", async (context) => {
    const html = await ejs.renderFile("views/index.html", {
        name: "Petr",
        todos: todos
    })
    return context.html(html)
})

app.post("/add-todo", async (context) => {
    const body = await context.req.formData()
    const title = body.get("title")

    todos.push({id: todos.length + 1, title, done: false})

    return context.redirect("/")
})

app.get("/remove-todo/:id", async (context) => {
    const id = Number(context.req.param("id"))
    todos = todos.filter((todo) => todo.id !== id)
    
    return context.redirect("/")
})

app.get("/toggle-todo/:id", async (context) => {
    const id = Number(context.req.param("id"))
    const todo = todos.find((todo) => todo.id === id)
    todo.done = !todo.done

    return context.redirect("/")
})

app.get("/hello/:name", async (context) => {
    const name = context.req.param("name")
    return context.html(`<h1>Hello, ${name}</h1>`)
})

app.use(async (context) => {
    context.status(404)
    return context.html("<h1>Page not found!</h1>")
})

serve({
    fetch: app.fetch,
    port: 8000
})