// ============= Test Cases =============
import type { Alike, Expect } from '../test-utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}


// ============= Your Code Here =============
/* 
  1. Ви можете використовувати T = {} як значення за замовчуванням, навіть параметри за замовчуванням і значення, 
  що повертається за замовчуванням, а потім передати T рекурсивно для досягнення рекурсивного глобального запису

  2. option — це функція, яка отримує два значення: K і V. Для того, щоб ключ був неповторюваним, 
  він має бути переданий у загальному типі V — це будь-який тип загального типу, який можна передати безпосередньо без обмежень.
  type Chainable<T = {}> = {
    option: <K extends PropertyKey, V>(key: K, value: V) => Chainable<T & Record<K, V>>
    get: () => T
  }

  3. Спочатку перевірте дублікат ключа та повідомте про помилку, коли буде передано той самий ключ.
  type Chainable<T = {}> = {
    option: <K extends string, V>(
      key: K extends keyof T ? never : K,
      value: V
    ) => Chainable<T & Record<K, V>>
    get: () => T
  }

  4. Нарешті, direct & union не може перезаписати типи з тим самим ключем, тому використовуйте Omit,
  щоб видалити той самий ключ у попередньому типі.
  type Chainable<T = {}> = {
    option: <K extends string, V>(
      key: K extends keyof T
        ? V extends T[K]
          ? never : K
        : K,
      value: V
    ) => Chainable<Omit<T, K> & Record<K, V>>
    get: () => T
  }
*/

type Chainable<T extends Record<string, unknown> = {}> = {
  option<K extends PropertyKey, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>> 
  get(): T
}
