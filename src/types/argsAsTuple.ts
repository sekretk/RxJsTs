import { combineLatest, merge, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

type First<T extends any[]> = T extends [infer F, ... infer R] ? F : T;

type DropFirst<T extends any[]> = T extends [infer F, ... infer R] ? R : T;

type UnionAll<T extends any[]> = T extends [infer F, ...infer R] ? F & UnionAll<R> : T;

type DistinctiveUnion<T extends any[]> =
    T extends [infer F, ...infer R]
    ? keyof F extends Exclude<keyof F, keyof DistinctiveUnion<R>>
        ? F & DistinctiveUnion<R>
        : {}
    : T;

type TSubject01 = [number, boolean, string, Array<string>];

type GetLength<T extends any[]> = T extends { length: infer L } ? L : never;

//type trr = rrr[GetLength<rrr>-1]

//type DropFirst<T extends any[]> = T extends [in]

type LastInTuple<T extends any[]> = T[GetLength<DropFirst<T>>]

type EX01 = LastInTuple<TSubject01>;

type TSubject02 = [{ a: string }, { b: number }, { c: boolean }];

const restrictedFunc = (arg: { a: number, b: string, c: boolean }): void => { };
const resultGen = <T extends any[]>(...[first, ...rest]: T): DistinctiveUnion<T> => ({...first, ...resultGen(rest)})

restrictedFunc(
    resultGen(
        { a: 1 },
        { b: '1', d: true },
        { c: false },
    )
)

const stateObs = (): Observable<{ a: number, b: string, c: boolean }> =>
    combineLatest([
        of({ a: 1 }),
        of({ b: '1', d: true }),
        of({ c: false }),
    ]).pipe(
        map(x => resultGen(...x)),
    );

type Merge<F, S> = {
    [P in (keyof F | keyof S)]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never;
    };

type MergeArr<T extends any[]> =
T extends [infer F, ...infer R]
    ? keyof F extends Exclude<keyof F, keyof DistinctiveUnion<R>>
        ? Merge<F, MergeArr<R>>
        : {}
    : {};

//const subb: DistinctiveUnion<[{a: number, c: boolean}, {c: number}, {c: boolean}]>;
