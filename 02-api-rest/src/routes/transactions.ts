import type { FastifyInstance } from "fastify"

import crypto from "node:crypto"

import { knex } from "../database"
import {
  createTransactionSchema,
  getTransactionParamsSchema
} from "../schemas/transactions"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select("*")

    return { transactions }
  })

  app.get("/:id", async request => {
    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex("transactions").where("id", id).first()

    return { transaction }
  })

  app.get("/summary", async () => {
    const summary = await knex("transactions")
      .sum("amount", { as: "amount" })
      .first()

    return { summary }
  })

  app.post("/", async (request, response) => {
    const { title, amount, type } = createTransactionSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      response.cookie("sessionId", sessionId, {
        path: "/", // Qualquer rota pode acessar
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }

    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId
    })

    return response.status(201).send()
  })
}
