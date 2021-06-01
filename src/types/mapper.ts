type Transformator<Tin, Tout> = (obj: Tin) => Tout;

type DistinctUnion<TLeft, TRight, Fallback = {}> = 
    keyof TLeft extends Exclude<keyof TLeft, keyof TRight>
    ? TLeft & TRight
    : Fallback;

type Mapper<Tin, TinTemp = {}, ToutTemp = {}> = {
    map<K extends Exclude<keyof Tin, keyof TinTemp>, R>(key: K, value: Transformator<Tin[K], R>): 
    Mapper<Tin, TinTemp & Record<K, Tin[K]>, DistinctUnion<ToutTemp,R>>//IfExludes<ToutTemp, R, Mapper<never>, Mapper<Tin, TinTemp & Record<K, Tin[K]>, ToutTemp & R>>;
    result(): Transformator<TinTemp, ToutTemp>;
  };

declare function mapperFabric<Tin>(): Mapper<Tin>;

type TIssue1 = {
    a: number,
    b: boolean
}

type TIssue2 = {
    c: number,
    b: string,
    d: boolean
}


const issueMapper: Transformator<TIssue1, TIssue2> = 
    mapperFabric<TIssue1>()
    .map('a', (obj) => ({c: obj}))
    .map('a', (obj) => ({c: obj}))
    .map('b', () => ({b: 'aaa', d: true}))
    .result()
