type ObjectKey = string | number | symbol;
type AppendToObject<T, U extends ObjectKey, V> =
{
    [K in keyof T | U]: K extends keyof T ? T[K] : V
}

const func = <T, K extends ObjectKey, V>(key: K, value: V) => (source: T): AppendToObject<T, K, V> => {
    return {...source, [key]: value} as AppendToObject<T,K,V>;
}

const target = <T, R>(obj: T, mutator: (x: T) => R): R => mutator(obj);

const res = target({a: 1}, func(1, true));