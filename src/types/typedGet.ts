type tA = 'a' | 'b' | 'c';
type tB = 'd' | 'e';
type someRe = `${tA}.${tB}`

type Get<T, K extends string> = K extends `${infer P0}.${infer P1}` ? P0 extends keyof T ? Get<T[P0], P1> : never : K extends keyof T ? T[K] : never;
//https://dev.to/phenomnominal/i-need-to-learn-about-typescript-template-literal-types-51po
type PathImpl<T, Key extends keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
    ? | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
      | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T, Key extends keyof T = keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
    ? | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
      | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
      | Key
    : never
  : never;

type PathValue<T, P extends PathImpl2<T>> =
  P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends PathImpl2<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;
    

declare function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P>;

const object = {
  firstName: "Diego",
  lastName: "Haz",
  age: 30,
  projects: [
    { name: "Reakit", contributors: 68 },
    { name: "Constate", contributors: 12 },
  ]
} as const;

type Path01<T, Key extends keyof T = keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
    ? | `${Key}.${Path01<T[Key], Exclude<keyof T[Key], keyof Array<any>>> & string}`
      | `${Key}.${Exclude<keyof T[Key], keyof Array<any>> & string}`
      | Key
    : never
  : never;


type test = Path<typeof object>
type test2 = PathImpl2<typeof object>

get(object, "projects.0.contributors");