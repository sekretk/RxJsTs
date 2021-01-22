// your answers
type Curry<T, U> =
  T extends [infer head, ...infer tail]
    ? (arg: head) => Curry<tail, U>
    : U;

declare function Currying<T extends unknown[], U>(fn: (...args: T) => U): Curry<T, U>;

const equal = <T>(a: T, b: T): boolean => a === b;

Currying(equal)()