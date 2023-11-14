// =========== Test Cases ===========
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [['A', 'B']]>>,
  Expect<Equal<Hanoi<2>, [['A', 'C'], ['A', 'B'], ['C', 'B']]>>,
  Expect<Equal<Hanoi<3>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
  Expect<Equal<Hanoi<5>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['B', 'C'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['C', 'A'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
]

// =========== Your Code Here ===========
type Hanoi<
  Rings extends number,
  FromRod extends string = 'A',
  ToRod extends string = 'B',
  IntermediateRod extends string = 'C',
  Acc extends '🇺🇦'[] = []
> =
  Acc['length'] extends Rings
    ? []
    : [
        ...Hanoi<Rings, FromRod, IntermediateRod, ToRod, [...Acc, '🇺🇦']>,
        [FromRod, ToRod],
        ...Hanoi<Rings, IntermediateRod, ToRod, FromRod, [...Acc, '🇺🇦']>
      ]

/*
  We should move disk from rod-A to rod-B using rod-C as a intemediate helper rod. Only one disk at a time.
  So, I explain on Hanoi<1> example.
  By default Acc is empty array and it's length 0, so we skip true branch of our comparison and go to false branch.
  1. We should get an array of arrays (combination of A | B | C). So, wrap false branch with [].
  2. First recursive spread.
    2.1 We run "Hanoi" type with Hanoi<1, 'A', 'C', 'B', [...[], '🇺🇦']>.
      - Here we should take a look on number of rings and length of Acc.
      - We have Rings = 1 and Acc with one '🇺🇦'. So, result gonna be an empty [] with length 1.
      - That's why we use spread operator. When we spread an empty array we get 'never' type and it skiped in our RESULT ARRAY.
    2.2 Just an array with ['A', 'B']
    2.3 The same explanation as in a 2.1.
*/