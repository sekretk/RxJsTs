import { from } from "rxjs";
import { groupBy, map, mergeMap, toArray } from "rxjs/operators";

type Union<T extends any[]> = T extends [infer L, ...infer R] ? L & Union<R> : {};
type FunctionResults<T extends any[]> = T extends [FuncResult<infer L>, ...infer R] ? [L, ...FunctionResults<R>] : [];

type FuncResult<T> = (a: any) => T;

const mainFunc = <T extends any[]>(args: T): Union<T> =>
    args.reduce((acc, val) => ({ ...acc, ...val }), {})

const fabrics = [() => ({ a: 1 }), () => ({ b: 'x' })];

type params = [{ a: 1 }, { b: 'x' }];

type TupleToUnion<T extends Array<any>> = T[number];


// export const memoize = (func: (...a) => any) => {
//     const cache = new Map<string, any>();
//     return (...args) => {ringified = args.toString();
//         const argStringified = toKey(args);
//         if (cache.has(argStringified)) {
//             return cache.get(argStringified);
//         }
//         cache.set(argStringified, func.apply(this, args));
//         return cache.get(argStringified);
//     };
// };

const toKey = <T>(args: T): string => args.toString();

const ffun =  <T extends any[],R>(..._: any[]) => {
    return _ as unknown as R;
};

ffun('1', '2', '2')

const people = [
    { name: 'Sue', age: 25 },
    { name: 'Joe', age: 30 },
    { name: 'Frank', age: 25 },
    { name: 'Sarah', age: 35 }
  ];
  //emit each person
  const source = from(people);
  //group by age
  const example = source.pipe(
    groupBy(person => person.age),
    // return each item in group as array
    mergeMap(group => group.pipe(toArray()))
  );

  type IOne = 'one';
  type ITwo = 'two';

  //const trr: IOne | ITwo;

  // const isTheOne = (value: IOne | ITwo): value is IOne => value === 'one';

  // !isTheOne(trr) ? console.log(trr) : console.log(trr);

const en = {one: 1, two: 2} as const;

type PickRequired<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: K
}

type RequiredKeys<T> = PickRequired<T>[keyof PickRequired<T>]

type Result = RequiredKeys<{ foo: number; bar?: string }>;

export type StringEnumLike = {
  [id: string]: string;
};

enum SomeEnum {
  SS = 'ss',
  RR = 'rr'
}

export const backwardStringEnumGetter= (enumLike: StringEnumLike, value: string, fallback: string): string => enumLike[value] ?? fallback;

const value = SomeEnum.RR;

backwardStringEnumGetter(SomeEnum, value, SomeEnum.RR)

type PartialWithExclutions<T, K extends keyof T> = Partial<T> & {[k in K]: T[k]}

const ttt: PartialWithExclutions<{a: number, b: string}, 'a'>;

ttt.

type KeyVal<Tin, Tout> = {
    [P in keyof Tin]: (value: Tin[P]) => Partial<Tout>;
}