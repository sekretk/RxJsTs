type tA = 'a' | 'b' | 'c';
type tB = 'd' | 'e';
type someRe = `${tA}.${tB}`

type Get<T, K extends string> = K extends `${infer P0}.${infer P1}` ? P0 extends keyof T ? Get<T[P0], P1> : never : K extends keyof T ? T[K] : never;

const gettingFunc = <T, K extends string>(value: T, key: string): Get<T,K> => {return undefined;}

gettingFunc({a: 1, b: {c: true, d: 'some'}}, 'a')

type SubjectType = {
    a: {
        b: number,
        c: string,
    },
    b: boolean
}

type rrt = keyof SubjectType['a'|'b']

type typeRes = DeepSeleсtor<SubjectType>;

const obj: SubjectType;



const rrr: Get<SubjectType, 'a.b'>;

type DeepPropResult<T,P> = number;

type PropChain<T> = number;



function someExtractor<T, P extends string>(value: T, selector: P): DeepPropResult<T,P> {
    return 'some value';
}

rrr