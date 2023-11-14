// =========== Test Cases ===========
import type { Equal, Expect } from '../test-utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string; age: {} } }>>,
]

// =========== Your Code Here ===========
type DeepOmit<T, Paths> = Paths extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? {
        [P in keyof T]: P extends K ? DeepOmit<T[P], R> : T[P];
      }
    : T
  : {
      [K in keyof T as K extends Paths ? never : K]: T[K];
    }
;
