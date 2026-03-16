import http from "http"
import fs from "fs/promises"
import { read } from "fs"

const readHtml = async (file) => {
    //await new Promise((resolve) => setTimeout(resolve, 2000)) // waiting for 2s
    try {
        const data = await fs.readFile(file)
        return data.toString()
    } catch (err){
        console.log("file does not exist", err)
        return null;
    }
}

const server = http.createServer(async (request, response) => {
    let html = await readHtml("public/" + request.url)
    console.log(html)
    
    if (html){
        response.statusCode = 200
    } else {
        html = await readHtml("not_found.html")
        response.statusCode = 404
    }

    response.write(html)
    response.end()
})

server.listen(8080, "localhost", () => {
    console.log("Server started on http://localhost:8080")
})