// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]


// ============= Your Code Here =============
// type Diff<
//   L extends Record<PropertyKey, unknown>,
//   R extends Record<PropertyKey, unknown>
// > = {
//   [
//     P in keyof (L & R) as Exclude<P, keyof L & keyof R>
//   ]: (L & R)[P]
// }

// ============= Alternatives =============
type Diff< L extends Record<PropertyKey, unknown>, R extends Record<PropertyKey, unknown> > = Omit<L & R, keyof (L | R)>
