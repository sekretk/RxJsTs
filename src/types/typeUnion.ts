interface Flavoring<T> {
    _type?: T;
}

type Flavor<T, TFlavor> = T & Flavoring<TFlavor>;

type True = Flavor<true, 'bool'>;
type False = Flavor<false, 'bool'>;

const trr: True = true;
const fll: False = false;

if (trr) console.log('TRUEE')
if (!fll) console.log('FLLL')

type Val = {
    a: number
}

type ValExtention =
    (Val & { flush: false }) | { flush: true };

const gen = (): ValExtention =>
    Math.random() > 0.5
        ? {a: 1, flush: false as const}
        : {flush: true as const};

const resss = gen();

const isVal = (a: ValExtention): a is Val & {flush: false} => !a.flush;

if (isVal(resss)) {

}