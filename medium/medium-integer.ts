// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]


// ============= Your Code Here =============
type Integer<T> =
  `${T & number}` extends `${string}.${string}`
    ? never
    : number extends T
      ? never
      : T
;
