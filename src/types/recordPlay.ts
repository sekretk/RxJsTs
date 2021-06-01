// export const add = <Tin, K extends string, V>(key: K, val: V): (x: Tin) => (Tin & Record<K,V>) =>
//     (subj: Tin) => ({ ...subj, ...{ [key]: val } });

// const testFunc = <Tin,Tout>(value: Tin, mutator: (x: Tin) => Tout): Tout => mutator(value);

// const subj = {foo: 'bar'};

// const result = testFunc(subj, add('newProp', 1));