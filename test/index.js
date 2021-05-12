const {AdderTest} = require('../lib/adder.test')
const {ApiTest} = require('./api.test')
const {UiTest} = require('./ui.test')

class Main {
  async run () {
    const testcases = [
      new AdderTest(),
      new ApiTest(),
      new UiTest(),
    ]

    for (const testcase of testcases) {
      await testcase.print()
    }
  }
}

if (require.main === module) {
  main()
}

async function main () {
  try {
    await new Main().run()
  } catch (err) {
    console.error(err.message)
    console.debug(err.stack)
  }
}
