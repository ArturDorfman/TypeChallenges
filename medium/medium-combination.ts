// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============
type IsNever<T> = [T] extends [never] ? true : false

type AllCombinations<
  T extends string[],
  S extends string = T[number]
> =
  IsNever<S> extends true
    ? ''
    : '' | {
      [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}`
    }[S]

type TrimRight<T extends string> =
    T extends `${infer Head}${' ' | '\n' | '\t'}`
      ? TrimRight<T>
      : T

type Combination<T extends string[]> =
  TrimRight<Exclude<AllCombinations<T>, ''>>
