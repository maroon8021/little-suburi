import { findSpecificText } from "#/find-specific-text"

describe("findSpecificText", () => {
  test("findSpecificText javascript", () => {
    expect(findSpecificText("javascript")).toBe(2)
  })

  test("findSpecificText php", () => {
    expect(findSpecificText("php")).toBe(0)
  })

  test("findSpecificText jjjj", () => {
    expect(findSpecificText("jjjj")).toBe(4)
  })

  test("findSpecificText JAVA", () => {
    expect(findSpecificText("JAVA")).toBe(1)
  })

  test("findSpecificText JAVA & javascript", () => {
    expect(findSpecificText("JAVA & javascript")).toBe(3)
  })

  test("findSpecificText ''", () => {
    expect(findSpecificText("")).toBe(0)
  })

  test("findSpecificText @#%", () => {
    expect(findSpecificText("@#%")).toBe(0)
  })
})
