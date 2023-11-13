// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============
// Reverses a string: '123' -> '321'
type Reverse<S extends string, A extends string = ''> =
  S extends `${infer F}${infer R}`
    ? Reverse<R, `${F}${A}`>
    : A

// Subtract one from a digit: '1' -> '0', '5' -> '4', '0' -> '9'
type DigitMinusOne<D extends string> =
  '09876543210' extends `${string}${D}${infer R}${string}`
    ? R
    : never

// Subtract one from a reversed number: '5' -> '4', '01' -> '9', '51' -> '41', '001' -> '99'
type RevMinusOne<T extends string> =
  T extends `${infer F}${infer N}${infer R}`
    // if `T` is a multi-digit number like '01', '55' or '123'
    ? F extends '0'
      ? `9${RevMinusOne<`${N}${R}`>}`
      : `${DigitMinusOne<F>}${N}${R}`
    // if `T` is a single-digit number like '0', '1' or '8'
    : T extends '0'
      ? '1-'
      : T extends '1'
        ? ''
        : DigitMinusOne<T>

// Reverse `T`, subtract one from reversed, reverse back, and convert to number
type MinusOne<T extends number> =
  Reverse<RevMinusOne<Reverse<`${T}`>>> extends `${infer Res extends number}`
    ? Res
    : 0
