type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never
  }[keyof T]

type subj = {
    a?: string,
    b?: number,
}

type result = OptionalKeys<subj>