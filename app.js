const express = require('express')
const app = express()

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>JS Testing</title>
      </head>
      <body>
        <main>
          <h1>JS Testing</h1>
          <form role="form" action="./api/add">
            <div>
              <label for="operand1">Operand 1</label>
              <input type="number" name="operand1" id="operand1" required>
            </div>
            <div>
              <label for="operand2">Operand 2</label>
              <input type="number" name="operand2" id="operand2" required>
            </div>
            <button type="submit" id="submit">Submit</button>
          </form>
        </main>
      </body>
    </html>
  `

  res.send(html)
})

app.get('/api/add', (req, res) => {
  const operand1 = parseInt(req.query.operand1, 10)
  const operand2 = parseInt(req.query.operand2, 10)
  const result = operand1 + operand2

  res.send({operand1, operand2, result})
})

app.listen(3000, () => console.info('Listening on 3000'))
