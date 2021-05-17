const assert = require('assert')
const { Adder } = require('./adder')

class AdderTest {
  async run() {
    const tests = [
      this.testAdd,
      this.testBigAdd,
      async function a ()  { assert.ok("Pass") },
      async function nonamePass() { assert.ok("Pass") },
      async function nonameFail() { assert.fail("Fail") }
    ]

    for (const test of tests) {
      await test.call(this)
      console.info(`PASS AdderTest.${test.name}`)
    }
  }

  async testAdd() {
    const adder = new Adder()
    const operand1 = 1
    const operand2 = 2
    const actual = adder.add(operand1, operand2)
    const expected = 3

    assert.deepStrictEqual(actual, expected)
  }

  async testBigAdd() {
    const adder = new Adder()
    const operand1 = 10000000000000000n
    const operand2 = 1n
    const actual = adder.add(operand1, operand2)
    const expected = 10000000000000001n

    assert.deepStrictEqual(actual, expected)
  }
}

if (require.main === module) {
  main()
}

async function main() {
  try {
    await new AdderTest().run()
  } catch (err) {
    console.error(err.message)
    console.debug(err.stack)
  }
}

module.exports.AdderTest = AdderTest
