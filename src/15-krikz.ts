import { AssertTrue, IsExact } from "conditional-type-checks";

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
	nameOf<V extends valueOf<T>>(
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

type User = {
	name: string,
	id: number
}

export const nameOfFactory = <T>() => (name: keyof T) => name;

const nameOf1 = nameOfFactory<User>();

const nameOfTT = <T>() => (name: keyof T) => name

nameOfFactory<User>()('id');
nameOfTT<User>()("id");

type toProof<T> = keyof T extends string | number | symbol ? 'a' : 'b'
type testRes01 = AssertTrue<IsExact<toProof<Array<Object>>, 'a'>>
type testRes02 = AssertTrue<IsExact<toProof<User>, 'a'>>
type testRes03 = AssertTrue<IsExact<toProof<any>, 'a'>>

type rt = keyof any

const t = 'a'

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function ff(s: any): 's' {
	const t = 's'
	return 's';
}

type rttt = ReturnType<typeof ff>

const r: rttt = 's';

type tryr<T> = string extends (infer T) ? T : T;

console.log(r);