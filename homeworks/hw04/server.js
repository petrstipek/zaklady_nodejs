import http from 'http'
import fs from 'fs/promises'
import path from 'path';

const MEDIA_TYPES = {
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg",
    ".txt": "text/plain",
    ".html": "text/html"
}


const server = http.createServer(async (request, response) => {
    if (request.url === '/'){
        const data = await fs.readFile("static/index.html")

        response.writeHead(200, { 'Content-Type': 'text/html;' });
        response.end(data)
    } else {
        try {
            const filePath = path.join('public', request.url);
            const data = await fs.readFile(filePath)

            const ext = path.extname(filePath)
            const contentType = MEDIA_TYPES[ext] || 'text/plain';

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data)
        } catch {
            const data = await fs.readFile("static/404.html")
            
            response.writeHead(404, { 'Content-Type': 'text/html;' });
            response.end(data)
        }
    }
})

server.listen(8080, "localhost", () => {
    console.log("Server started on http://localhost:8080")
})