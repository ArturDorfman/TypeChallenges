// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
type FirstUniqueCharIndex<
  T extends string,
  Acc extends string[] = []
> =
  T extends ''
    ? -1
    : T extends `${infer Head}${infer Tail}`
      ? Head extends Acc[number]
        ? FirstUniqueCharIndex<Tail, [...Acc, Head]>
        : Tail extends `${string}${Head}${string}`
          ? FirstUniqueCharIndex<Tail, [...Acc, Head]>
          : Acc['length']
      : never
;
