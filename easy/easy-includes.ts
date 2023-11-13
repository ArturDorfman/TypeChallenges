// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>, // this
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>, // this
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>, // this
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>, // this
  Expect<Equal<Includes<[1], 1 | 2>, false>>, // this
  Expect<Equal<Includes<[1 | 2], 1>, false>>, // this
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]


// ============= Your Code Here =============
/* 
<T>() => T extends X ? 1 : 2 - ця частина виразу визначає функцію з дженеріком T.
Тут <T>() - це декларація дженеріка T. Ця функція не приймає жодних аргументів; вона просто оголошує, що є типом T.

Kоли викликається функція, ви не передаєте жодного аргумента. Тип T залежить від контексту, де ви використовуєте цей вираз.
TypeScript автоматично визначає тип T з контексту використання цієї функції. Наприклад:

const result1: Equal<string, string> = true; // T буде визначено як string, бо X і Y - це string
const result2: Equal<string, number> = false; // T буде визначено як string, бо X і Y - це різні типи
 */

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false;

type Includes<T extends readonly unknown[], U> = 
  T extends [infer Head, ...infer Tail]
  ? MyEqual<Head , U> extends true
    ? true
    : Includes<Tail, U>
  : false;
