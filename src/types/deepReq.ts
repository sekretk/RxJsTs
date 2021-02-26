

type Expect<T extends true> = T
//UNCOMMENT NEEDED
//  type ExpectTrue<T extends true> = T
//  type ExpectFalse<T extends false> = T
//  type IsTrue<T extends true> = T
//  type IsFalse<T extends false> = T
// type Extends<T, K extends T> = T;

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
  
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

export type DeepRequired<T> = 
  T extends Function 
    ? T 
    : T extends object 
      ? { [P in keyof T]-?: DeepRequired<T[P]>; } 
      : T;

type TestSubjectType02 = {
  a?: string,
  b?: string,
  c: {
    d?: string,
    e?: string
  },
  arr: Array<number>,
  create: () => boolean,
}

type TestSubjectTypeReq02 = {
  a: string,
  b: string,
  c: {
    d: string,
    e: string
  },
  arr: Array<number>,
  create: () => boolean,
}

type subj = DeepRequired<TestSubjectType02>;

type result = Expect<Equal<DeepRequired<TestSubjectType02>, TestSubjectTypeReq02>>;

type condFuncType<T> = T extends object ? boolean : string;

const tt: condFuncType<() => boolean>;