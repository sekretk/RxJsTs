type OnlyOneProp<T> = {[K in keyof T]: Pick<Required<T>, K>};

type NonEmpty<T, U = OnlyOneProp<T>> = Partial<T> & U[keyof U];

type I = {
    id?: string
    name?: string
    country?: string
}

const trr: OnlyOneProp<I> = {
    id: {id: '111'},
    name: {name: '111'},
    country: {country: '111'},
}

declare function ff(i: NonEmpty<I>): void

ff({})
ff({ id: '', country: 'asd' })