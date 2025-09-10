declare module "knex/types/tables" {
  export type Tables = {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
