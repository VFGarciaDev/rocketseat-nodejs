import { Readable } from "node:stream"

// Readable Stream
class OneToHundredStream extends Readable {
  index = 1

  // Método leitura do Readable
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null) // "return null"
      } else {
        // "Buffer" -> Tipagem que node consegue entender
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 500)
  }
}

fetch("http://localhost:3434", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half"
})
  .then(response => response.text())
  .then(data => {
    console.log(data)
  })
