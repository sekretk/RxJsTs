type First<T extends any[]> = T extends [infer F, ... infer R] ? F : T;

type DropFirst<T extends any[]> = T extends [infer F, ... infer R] ? R : T;

type UnionAll<T extends any[]> = T extends [infer F, ...infer R] ? F & UnionAll<R> : T;

type TSubject01 = [number, boolean, string, Array<string>];

type GetLength<T extends any[]> = T extends { length: infer L } ? L : never;

//type trr = rrr[GetLength<rrr>-1]

//type DropFirst<T extends any[]> = T extends [in]

type LastInTuple<T extends any[]> = T[GetLength<DropFirst<T>>]

type EX01 = LastInTuple<TSubject01>;

type TSubject02 = [{ a: string }, { b: number }, { c: boolean }];

const wrappFunc = <T extends any[]>(...args: T): UnionAll<T> => args as UnionAll<T>;

const restrictedFunc = (arg: {a: number, b: string, c: boolean}):void => {};

restrictedFunc(
    wrappFunc(
        {a: 1},
        {b: '1', c: true},
        {c: false},
    )
)

type KeysIntersect<T, R> = keyof T & keyof R;

type AllKeyIntersect<T extends any[]> = T extends [infer F, ... infer R] 
            ? KeysIntersect<F, AllKeyIntersect<R>> 
            : never;

type TSubject025 = [{ r: string }, { b: number }, { c: boolean, b: number }];
type EX25 = AllKeyIntersect<TSubject025>;

const a = {a: 1};
const b = {b: '1', c: '2'};

type INTR_EX01 = KeysIntersect<typeof a, typeof b>;

type DistinctedUnion<T extends any[]> = AllKeyIntersect<T> extends never ? UnionAll<T> : never;

type EX03 = DistinctedUnion<TSubject02>;

type TSubject03 = [{ r: string }, { b: number }, { c: boolean, b: number }];

type EX04 = AllKeyIntersect<TSubject03>;

type EX05 = DistinctedUnion<TSubject03>;