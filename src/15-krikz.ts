export type valueOf<T> = T[keyof T];

export function nameOf<T, V extends T[keyof T]>(f: (x: T) => V):
	valueOf<{ [K in keyof T]: T[K] extends V ? K : never }>;

export function nameOf(f: (x: any) => any): keyof any {
	const p = new Proxy(
		{},
		{
			get: (target, key) => key,
		},
	);
	return f(p);
}

export interface I_$<T> {
	nameOf<V extends T[keyof T]>(
		f: (x: T) => V,
	): valueOf<{ [K in keyof T]: T[K] extends V ? K : never }>;
}

export function _$<T>(obj: T) {
	return {
		nameOf: (f: (x: any) => any) => nameOf(f),
	} as I_$<T>;
}

function nameOff<T>(instance: T, key: keyof T): keyof T {
    return key;
}

export function krikz(){
//nameOf(console.log)
//const rr = nameOff({a: 'as', b: 1}, 'a')
//console.log(rr)

const val = {a: 'a', b: 1}
console.log(_$(val).nameOf(x => x.b))
}