import { sum } from "./example"


test("1 + 2 = 3 bo'ladi", () => {
    expect(sum(1, 2)).toBe(3)
})