import cookie from "@fastify/cookie"
import fastify from "fastify"

import { knex } from "./database"
import { env } from "./env"
import { transactionsRoutes } from "./routes/transactions"

const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, {
  prefix: "transactions"
})

app.get("/knex-schema", async () => {
  return await knex("sqlite_schema").select("*")
})

app
  .listen({
    port: env.PORT
  })
  .then(() => {
    console.log("HTTP Server Running.")
  })
