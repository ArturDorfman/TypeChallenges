// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============
type Whitespace = ' ' | '\n' | '\t'

// type TrimLeft<S extends string> = S extends `${Whitespace}${infer Tail}` ? TrimLeft<Tail> : S
// type TrimRight<S extends string> = S extends `${infer Head}${Whitespace}` ? TrimRight<Head> : S

// type Trim<S extends string> = TrimLeft<TrimRight<S>>

// ============= Alternatives =============
type Trim<S extends string> = S extends (`${Whitespace}${infer U}` | `${infer U}${Whitespace}`) ? Trim<U> : S
