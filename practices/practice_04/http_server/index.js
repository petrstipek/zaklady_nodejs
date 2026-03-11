import http from "http"

const server = http.createServer((request, response) => {
    console.log(request.url)

    //response.statusCode = 404
    response.setHeader("Content-type", "text/html")
    //response.statusCode = 301
    //response.setHeader("Location", "/test")
    response.write("Hello, World! bla bla")
    response.end()
})

server.listen(8080, "localhost", () => {
    console.log("Server started on http://localhost:8080")
})