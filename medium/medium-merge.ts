// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
type Merge<L, R> = {
  [P in keyof L | keyof R]:
    P extends keyof R
      ? R[P]
      : P extends keyof L
        ? L[P]
        : never
}

// ============= Alternatives =============
// type Merge<L, R> = {
//   [P in keyof (L & R)]:
//     P extends keyof R
//       ? R[P]
//       : (L & R)[P]
// }

// type Merge<
//   L extends Record<PropertyKey, unknown>,
//   R extends Record<PropertyKey, unknown>
// > = {
//   [P in keyof (L & R)]: P extends keyof R ? R[P] : L[P]
// }
