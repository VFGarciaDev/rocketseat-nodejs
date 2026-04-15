import { Readable, Writable, Transform } from "node:stream"

// Readable Stream
class OneToHundredStream extends Readable {
  index = 1

  // Método leitura do Readable
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null) // "return null"
      } else {
        // "Buffer" -> Tipagem que node consegue entender
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 500)
  }
}

class TransformToNegativeStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // 1 param: caso retorne erro
    // 2 param: retorno
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(
    chunk, //-> o que recebemos da Readable Stream
    encoding, //-> como a informação está codificada
    callback //-> função para chamar quando terminar de ler o chunk
  ) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// new OneToHundredStream().pipe(process.stdout)
// new OneToHundredStream().pipe(new MultiplyByTenStream())
new OneToHundredStream()
  .pipe(new TransformToNegativeStream())
  .pipe(new MultiplyByTenStream())
