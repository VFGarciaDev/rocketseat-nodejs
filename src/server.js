import http from "node:http"

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (url === "/users") {
    if (method === "GET") {
      return res.end("Listagem de usuários")
    } else if (method === "POST") {
      return res.end("Criação de usuários")
    }
  }

  return res.end("Hello World")
})

server.listen(3030)
