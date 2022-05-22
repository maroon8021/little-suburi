import { calc, discount } from "#/calc"

describe("calc test", () => {
  test("calc test correctly", () => {
    expect(calc(20, 6)).toBe(120)
  })

  test("calc test showing error", () => {
    expect(() => {
      calc(20, -6)
    }).toThrow('"count" has to be 1 or more')
  })
})

describe("discount test", () => {
  test("discount test correctly round up", () => {
    expect(discount(77, 2)).toBe(139)
  })

  test("discount test correctly round down", () => {
    expect(discount(77, 4)).toBe(277)
  })

  test("discount test showing error", () => {
    expect(() => {
      discount(77, -4)
    }).toThrow('"count" has to be 1 or more')
  })
})
