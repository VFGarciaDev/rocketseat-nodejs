import type { FastifyInstance } from "fastify"

import crypto from "node:crypto"

import { knex } from "../database"
import { checkUserSessionId } from "../middlewares/check-user-session-id"
import {
  createTransactionSchema,
  getTransactionParamsSchema
} from "../schemas/transactions"

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request, response) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  app.get(
    "/",
    {
      preHandler: [checkUserSessionId]
    },
    async request => {
      const { sessionId } = request.cookies

      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select("*")

      return { transactions }
    }
  )

  app.get(
    "/:id",
    {
      preHandler: [checkUserSessionId]
    },
    async request => {
      const { id } = getTransactionParamsSchema.parse(request.params)
      const { sessionId } = request.cookies

      const transaction = await knex("transactions")
        .where({
          id,
          session_id: sessionId
        })
        .first()

      return { transaction }
    }
  )

  app.get(
    "/summary",
    {
      preHandler: [checkUserSessionId]
    },
    async request => {
      const { sessionId } = request.cookies

      const summary = await knex("transactions")
        .where("session_id", sessionId)
        .sum("amount", { as: "amount" })
        .first()

      return { summary }
    }
  )

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
