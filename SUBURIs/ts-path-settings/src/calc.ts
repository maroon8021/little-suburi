const DISCOUNT_RATE = 0.9

export const calc = (price: number, count: number): number => {
  countCheck(count)
  return price * count
}

export const discount = (price: number, count: number): number => {
  countCheck(count)
  return Math.round(price * count * DISCOUNT_RATE)
}

const countCheck = (count: number): void => {
  if (count < 1) {
    throw new Error('"count" has to be 1 or more')
  }
}
