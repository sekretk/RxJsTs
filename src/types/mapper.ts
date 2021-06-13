type Expect<T extends true> = T
//UNCOMMENT NEEDED
//  type ExpectTrue<T extends true> = T
//  type ExpectFalse<T extends false> = T
//  type IsTrue<T extends true> = T
//  type IsFalse<T extends false> = T
// type Extends<T, K extends T> = T;

// type Equal<X, Y> =
//   (<T>() => T extends X ? 1 : 2) extends
//   (<T>() => T extends Y ? 1 : 2) ? true : false

type Equal<X, Y> = 
    X extends Y 
        ? Y extends X 
            ? true
            : false
        : false;

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true


type Transformator<Tin, Tout> = (obj: Tin) => Tout;

type DistinctUnion<TLeft, TRight, Fallback = {}> =
    keyof TLeft extends Exclude<keyof TLeft, keyof TRight>
    ? TLeft & TRight
    : Fallback;

type Mapper<Tin, TinTemp extends Partial<Tin> = {}, ToutTemp = {}> = {
    map<K extends Exclude<keyof Tin, keyof TinTemp>, R>(key: K, value: Transformator<Tin[K], R>):
    Mapper<Tin, TinTemp & Record<K, Tin[K]>, DistinctUnion<ToutTemp,R>>
    result: Transformator<TinTemp, ToutTemp>;
  };

class MapperInstance<Tin, TinTemp extends Partial<Tin> = {}, ToutTemp = {}> implements Mapper<Tin, TinTemp, ToutTemp> {
    func: Transformator<TinTemp, ToutTemp>;
    key: string;
    value: Transformator<any, any>;
}

type FlatRequired<T> = {
    [k in keyof T]-?: T[k]
}

type TIssue1 = {
    a?: number,
    b?: boolean
}

type TIssue2 = {
    c?: number,
    b?: string,
    d?: boolean
}

const issueMapper = 
    mapperFabric<TIssue1>()
    .map('a', (obj) => ({c: obj, b: 'aaa',}))
    //.map('a', (obj) => ({c: obj})) //ERROR: exclucive source keys
    .map('b', () => ({d: true}))
    //.map('b', () => ({b: 'aaa', d: true, c: 1})) //ERROR: exclusive result object
    .result()

type TransformatorIn<T> = T extends (arg: infer Tin) => any ? Tin : never;
type tt = TransformatorIn<typeof issueMapper>; //SOLUTION: try to compare this type to TIssue1
type TCase = Expect<Equal<TransformatorIn<typeof issueMapper>, TIssue1>>;

const testFunc = <T>(_inObj: T): void => undefined;
testFunc<FlatRequired<TIssue1>>({} as TransformatorIn<typeof issueMapper>);
testFunc<FlatRequired<TIssue2>>({} as ReturnType<typeof issueMapper>);

type pp = ReturnType<typeof issueMapper>;

const issueCons = (transformator: Transformator<TIssue1, TIssue2>) => (subj: TIssue1): TIssue2 => 
    transformator(subj);


issueCons(issueMapper);
