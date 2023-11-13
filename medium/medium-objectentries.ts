// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]


// ============= Your Code Here =============
type ObjectValues<T extends object> = T[keyof T]

type RemoveUndefined<T> =
  [T] extends [undefined]
    ? T
    : Exclude<T, undefined>

type ObjectEntries<T extends object> = ObjectValues<{
  [P in keyof T]-?: [P, RemoveUndefined<T[P]>]
}>
