// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]


// ============= Your Code Here =============
type CheckRepeatedChars<T extends string> =
  T extends `${infer L}${infer R}`
    ? R extends `${string}${L}${string}`
      ? true
      : CheckRepeatedChars<R>
    : false
;