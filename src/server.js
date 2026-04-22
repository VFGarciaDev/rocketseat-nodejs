import http from "node:http"

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunck of req) {
    buffers.push(chunck)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    console.log(req.body)
  } catch {
    req.body = null
  }

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
