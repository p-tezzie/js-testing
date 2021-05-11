const assert = require('assert')
const querystring = require('querystring')
const fetch = require('node-fetch')

class ApiTest {
  async run () {
    const tests = [
      this.testApiAdd,
    ]

    for (const test of tests) {
      await test.call(this)
      console.info(`PASS ApiTest.${test.name}`)
    }
  }

  async testApiAdd () {
    const search = '?' + querystring.stringify({
      operand1: 1,
      operand2: 2,
    })

    const url = 'http://127.0.0.1:3000/api/add' + search
    const response = await fetch(url)
    const actual = await response.json()
    const expected = {
      operand1: 1,
      operand2: 2,
      result: 3,
    }

    assert.deepStrictEqual(actual, expected)
  }
}

if (require.main === module) {
  main()
}

async function main () {
  try {
    await new ApiTest().run()
  } catch (err) {
    console.error(err.message)
    console.debug(err.stack)
  }
}

module.exports.ApiTest = ApiTest
