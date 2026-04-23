import http from "node:http"
import { json } from "./middlewares/json.js"

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (url === "/users") {
    if (method === "GET") {
      return res
        .setHeader("Content-type", "Application/json")
        .end(JSON.stringify(users, null, 2))
    } else if (method === "POST") {
      const { name, email } = req.body

      users.push({
        id: 1,
        name,
        email
      })

      return res.writeHead(201).end("Criação de usuários")
    }
  }

  return res.end("Hello World")
})

server.listen(3030)
