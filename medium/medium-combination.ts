// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  | 'foo'
  | 'bar'
  | 'baz'
  
  | 'foo bar' | 'bar baz'
  | 'foo baz' | 'baz foo'
  | 'bar foo' | 'baz bar'

  | 'foo bar baz' | 'bar foo baz'
  | 'foo baz bar' | 'bar baz foo'
  | 'baz foo bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============
type Combination<T extends string[], Union = T[number], Acc = Union> = 
  Acc extends (infer I extends string)
    ? I | `${I} ${Combination<[], Exclude<Union, I>>}`
    : never
