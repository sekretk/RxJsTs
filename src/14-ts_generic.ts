type flatArray<T> = T extends Array<infer R> ? R : T

const rr: flatArray<number> = null;

type funcWithOneObj<P extends {[x: string]: any}, R> = (prop: P) => R

type functor<P extends {[x: string]: any}, T> = (prop:P) => T

type destrFunc<F extends (prop: any) => any> = F extends functor<infer P, any> ? P : never;

const funcM = (prop: {x: number, y: number}): string => {
    return "1";
}

const props: destrFunc<typeof funcM> =  {x: 1, y: 2}

interface Abstract<T> {
    prototype: T;
}

interface IA{
    a: string
}

interface IB{
    b: number
}

const functt = <T>(i: number) => (s: string) => (inters: Array<Abstract<T>>) => {
return i + s + inters.length;
}