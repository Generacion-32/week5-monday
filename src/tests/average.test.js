const average = require('../functions/average')

test("Averge should return 5", () => {
  expect(average(4, 5, 6)).toBe(5)
  expect(average(40, 50, 60)).toBe(50)
})

