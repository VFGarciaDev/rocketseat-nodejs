export class Database {
  #database = {}

  select(table) {
    return this.#database[table] ?? []
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push({
        id: this.#database[table].length + 1,
        ...data
      })
    } else {
      this.#database[table] = [{ id: 1, ...data }]
    }

    return data
  }
}
