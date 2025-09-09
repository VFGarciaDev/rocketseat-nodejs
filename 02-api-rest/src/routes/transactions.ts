import { FastifyInstance } from "fastify"
import { knex } from "../database"
import crypto from "node:crypto"
import {
  createTransactionSchema,
  getTransactionParamsSchema
} from "../schemas/transactions"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const transactions = await knex("transactions").select("*")

    return { transactions }
  })

  app.get("/:id", async (request) => {
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

    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1
    })

    return response.status(201).send()
  })
}
