type Curried<T extends (...args: any) => any> = 
  T extends (arg: infer A) => infer R 
    ? (arg: A) => R 
    : T extends (...args: [infer A, ...infer Args]) => infer R
      ? (arg: A) => Curried<(...args: Args) => R>
      : never

declare function Currying<T extends (...args: any) => any>(fn: T): Curried<T>

Currying((a: number, b: boolean) => true)