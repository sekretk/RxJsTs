
type Params<F extends (...args: any[]) => any> = 
F extends (...args: infer A) => any ? A : never;

const f01 = (a: boolean, b: string, c: Date) => true;

type PR = Params<typeof f01>

type OtherHead<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

type head = Head<Params<typeof f01>>;
type otherhead = OtherHead<Params<typeof f01>>;

//type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : [];


type tail = Tail<Params<typeof f01>>;
//type mtail = MTail<Params<typeof f01>>;

type MHasTail<T extends any[]> =
T extends [] ? false : T extends [any] ? false : true;

type mhastail = MHasTail<[1, 2]>

type hastail = HasTail<[1]>


type ObjectInfer<T> = T extends (...args: infer A) => any ? A : never;

type ObjectPromiseInfer<T> = T extends Promise<infer A> ? A : never;

type test01 = ObjectInfer<(a: string, b: number) => boolean>;
type test02 = ObjectPromiseInfer<Promise<string>>;
const promise = new Promise<Date>(() => {});
type test03 = ObjectPromiseInfer<typeof promise>;

type ArrayInfer<T extends any[]> = T extends (infer U)[] ? U : never;
const arr = [1,'1',true];
type test04 = ArrayInfer<typeof arr>;

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true;
type Head<T extends any[]> = T extends [infer first, ...any] ? first : never;
type Tail<T extends any[]> = T extends [_: any, ...tail: infer TT] ? TT : [];

type Curry01<P extends any[], R> = (args: Head<P>) => HasTail<P> extends true ? Curry01<Tail<P>, R> : R;
declare function curry01<P extends any[], R>(f: (...args: P) => R): Curry01<P,R>;
const toCurry = (a: string, b: number, c: boolean) => Date;    
const testCur01 = curry01(toCurry)('ss')(1)(true);

type Curry02<P extends any[], R> = (arg: Head<P>, ...rest: Tail<Partial<P>>) => HasTail<P> extends true ? Curry02<Tail<P>, R> : R;
declare function curry02<P extends any[], R>(f: (...args: P) => R): Curry02<P,R>;
const toCurryWithParams = (a: string, b: number, ...c: boolean[]) => Date;   
const testCurWithParams = curry02(toCurryWithParams)('s')(1)