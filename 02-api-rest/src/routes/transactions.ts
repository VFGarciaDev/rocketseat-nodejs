import { FastifyInstance } from "fastify"
import { knex } from "../database"
import crypto from "node:crypto"
import { createTransactionSchema } from "../schemas/transactions"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions")
      .where("amount", 1000)
      .select("*")

    return transactions
  })

  app.post("/", async (request, response) => {
    const { title, amount, type } = createTransactionSchema.parse(request.body)

    await knex("transactions")
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === "credit" ? amount : amount * -1
      })

    return response.status(201).send()
  })
}
