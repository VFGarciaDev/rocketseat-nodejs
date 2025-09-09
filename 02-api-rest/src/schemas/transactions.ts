import z from "zod"

export const getTransactionParamsSchema = z.object({
  id: z.uuid()
})

export const createTransactionSchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"])
})

export type CreateTransaction = z.infer<typeof createTransactionSchema>
export type GetTransactionParams = z.infer<typeof getTransactionParamsSchema>
