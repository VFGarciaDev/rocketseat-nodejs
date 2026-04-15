import http from "node:http"

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (url === "/users") {
    if (method === "GET") {
      return res
        .setHeader("Content-type", "Application/json")
        .end(JSON.stringify(users, null, 2))
    } else if (method === "POST") {
      users.push({
        id: 1,
        name: "John Doe",
        email: "johndoe@email.com"
      })
      return res.end("Criação de usuários")
    }
  }

  return res.end("Hello World")
})

server.listen(3030)
