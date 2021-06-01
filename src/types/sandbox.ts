type Union<T extends any[]> = T extends [infer L, ...infer R] ? L & Union<R> : {};
type FunctionResults<T extends any[]> = T extends [FuncResult<infer L>, ...infer R] ? [L, ...FunctionResults<R>] : [];

type FuncResult<T> = (a: any) => T;

const mainFunc = <T extends any[]>(args: T): Union<T> => 
    args.reduce((acc, val) => ({...acc, ...val}), {})

const fabrics = [() => ({a: 1}), () => ({b: 'x'})];

type params = [{a: 1}, {b: 'x'}];

const rr: TupleToUnion<params>;

type TupleToUnion<T extends Array<any>> = T[number];

type KeyVal<Tin, Tout> = {
    [P in keyof Tin]: (value: Tin[P]) => Partial<Tout>;
}