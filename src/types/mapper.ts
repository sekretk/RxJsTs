export type Transformator<Tin, Tout> = (obj: Tin) => Tout;

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

    constructor(func: Transformator<TinTemp, ToutTemp>){
        this.func = func;
    }

    map<K extends Exclude<keyof Tin, keyof TinTemp>, R>(key: K, value: Transformator<Tin[K], R>): Mapper<Tin, TinTemp & Record<K, Tin[K]>, DistinctUnion<ToutTemp, R, {}>> {
        this.key = key as string;
        this.value = value;
        return new MapperInstance<Tin, TinTemp & Record<K, Tin[K]>, DistinctUnion<ToutTemp, R, {}>>(this.result as Transformator<TinTemp & Record<K, Tin[K]>, DistinctUnion<ToutTemp, R, {}>>);
    }

    result: Transformator<TinTemp, ToutTemp> = (obj: TinTemp) =>
        Boolean(this.value)
            ? ({...this.value(obj[this.key as keyof TinTemp]), ...this.func?.(obj)} as ToutTemp)
            : this.func?.(obj);
}

export const mapperFabric = <Tin>(): Mapper<Tin> => new MapperInstance<Tin>(undefined);

type FlatRequired<T> = {
    [P in keyof T]-?: T[P];
};

interface TIssue1 {
    a: number,
    b: boolean
}

interface TIssue2 {
    c?: number,
    b?: string,
    d?: boolean
}

const useMapper = (subj: TIssue1, transform: Transformator<TIssue1, TIssue2>) =>
    transform(subj);

const issueMapper =
    mapperFabric<TIssue1>()
    .map('a', (a) => ({c: a }))
    //.map('a', (obj) => ({c: obj})) //ERROR: exclucive source keys
    .map('b', (b) => ({b: 'aaa', d: true}))
    //.map('b', () => ({b: 'aaa', d: true, c: 1})) //ERROR: exclusive result object
    .result;

([{a: 1}, {b: true}] as Array<TIssue1>).map(issueMapper);