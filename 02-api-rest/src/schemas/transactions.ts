import z from "zod"

export const createTransactionSchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"])
})

export type CreateTransaction = z.infer<typeof createTransactionSchema>
