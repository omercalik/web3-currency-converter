declare global {
  interface Number {
    toFixedNumber(digits: number, base?: number): number
  }
}

export {}
