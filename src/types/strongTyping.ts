//type to work with in APP
type IInnerType = { a: number, b: boolean };

type ISettings = {
    a: number,
    b: boolean,
    c: string,
    d: Array<number>,
    r: IInnerType,
};

//SESSION_SERVIVE.giveState().d

const settingsObj: ISettings = {
    a: 1,
    b: true,
    c: 'awesome_string',
    d: [1, 2, 3],
    r: { a: 1, b: true }
};

type LiteralType<T extends ReadonlyArray<unknown>> = T extends Array<infer R> ? R : never;
export type PickFromArray<T, K extends ReadonlyArray<keyof T>> = Pick<T, Extract<keyof T, K[number]>>;
export type SerializedRecord<T> = Record<keyof T, string>;

//Store service
interface StoreService<T> {
    save(data: Partial<SerializedRecord<T>>): void;
    get<K extends ReadonlyArray<keyof T>>(keys: K): SerializedRecord<PickFromArray<T, K>>;
}

const store = {} as StoreService<ISettings>;

//STOP RIGHT THERE. Why not JSON.stringify + JSON.parse ??
//-- different ways for persist different props
//-- type casting can lead for error in runtime
//-- no possible migration

//it works for simple cases
store.save({ a: 'sasd' });
store.get(['a', 'b', 'd'] as const);

//Who to save all props?
const ALL_SETTINGS_PROPS = ['a', 'b', 'c', 'd', 'r'] as const;

type Expect<T extends true> = T;
type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

type TEST_TYPE = Expect<Equal<typeof ALL_SETTINGS_PROPS[number], keyof ISettings>>;

//settingsObj -> serializedObj by prop


store.save(
    ALL_SETTINGS_PROPS.reduce(
        (acc, cur) => ({ ...acc, ...{ [cur]: JSON.stringify(settingsObj[cur]) } }),
        {} as SerializedRecord<ISettings>)
);

//Work with partial
type ILayoutSettings = Pick<ISettings, 'a' | 'b'>
const layoutObj: ILayoutSettings = {
    a: 1,
    b: true,
};

const LAYOUT_PROPS = ['a', 'b'] as const;

type TEST_TYPE_FOR_LAYOUT = Expect<Equal<typeof LAYOUT_PROPS[number], keyof ILayoutSettings>>;

//layoutObj -> serializedObj by prop of layoutObj
store.save(
    LAYOUT_PROPS.reduce(
        (acc, cur) => ({ ...acc, ...{ [cur]: JSON.stringify(layoutObj[cur]) } }),
        {} as SerializedRecord<ILayoutSettings>)
);

//----------------------------------------------------------------------------


//-------PARSING----
const result = store.get(ALL_SETTINGS_PROPS);

ALL_SETTINGS_PROPS.reduce(
    (acc, cur) => ({ ...acc, ...{ [cur]: JSON.parse(result[cur]) } }),
    {} as ISettings);

export type TransformAction<Tin, Tout> = (item: Tin) => Tout;
export type PropertyParser<Subj, Target> = {
    [P in keyof Subj]: TransformAction<Target, Subj[P]>
}
const SETTINGS_TRANSFORMER: PropertyParser<ISettings, string> = {
    a: (val) => Number.isInteger(Number(val)) ? Number(val) : undefined,
    b: () => true,
    c: () => 's',
    d: () => [],
    r: () => ({a: 1, b: true}),
};

ALL_SETTINGS_PROPS.reduce((acc, cur) => ({ ...acc, ...{ [cur]: SETTINGS_TRANSFORMER[cur](result[cur]) } }), {} as ISettings);

export type RequiredKeys<T> = {
    [K in keyof T]-?: T extends Record<K, T[K]> ? K : never
}[keyof T];

type ComplexObject = {
    first: number,
    second: string,
    three?: string,
}

export const ensurerObjectType = <T>(obj: any, propsArray: ReadonlyArray<RequiredKeys<T>>): obj is T =>
    propsArray.every(prop => prop as string in obj);

export const objectParser = <T>(props: ReadonlyArray<RequiredKeys<T>>) => (obj: any): T | undefined =>
    ensurerObjectType<T>(obj, props) ? obj : undefined;

const COMPLEX_OBJECT_REQ = ['first', 'second'] as const;

type TEST_TYPE_02 = Expect<Equal<typeof COMPLEX_OBJECT_REQ[number], RequiredKeys<ComplexObject>>>;

const obj: any = {};

if (ensurerObjectType<ComplexObject>(obj, COMPLEX_OBJECT_REQ)) {
    obj.
}