const assert = require('assert')
const puppeteer = require('puppeteer')

class UiTest {
  async run () {
    const tests = [
      this.testHome,
    ]

    for (const test of tests) {
      await test.call(this)
      console.info(`PASS UiTest.${test.name}`)
    }
  }

  async testHome () {
    const browser = await puppeteer.launch({
      headless: false,
    })

    try {
      const page = await browser.newPage()

      await page.goto('http://127.0.0.1:3000/')

      await page.type('#operand1', '1')
      await page.type('#operand2', '2')

      await Promise.all([
        page.waitForNavigation(),
        page.click('#submit'),
      ])

      const text = await page.$eval('body', el => el.textContent)
      const actual = JSON.parse(text)
      const expected = {
        operand1: 1,
        operand2: 2,
        result: 3,
      }

      assert.deepStrictEqual(actual, expected)
    } finally {
      await browser.close()
    }
  }
}

if (require.main === module) {
  main()
}

async function main () {
  try {
    await new UiTest().run()
  } catch (err) {
    console.error(err.message)
    console.debug(err.stack)
  }
}

module.exports.UiTest = UiTest
