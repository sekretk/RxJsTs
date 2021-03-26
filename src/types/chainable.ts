type Chainable<T = {}> = {
    option<K extends string, V>(key: K, value: V): Chainable<Omit<T,K> & Record<K, V>>;
    get(): T;
  };

declare const config: Chainable

const result = config
  .option('id', 123)
  .option('name', 'homer')
  .option('bar', { value: 'some value' })
  .get()

  type SingleAssignmentChainable<T = {}> = {
    option<V>(key: Exclude<string, keyof T>, value: V): SingleAssignmentChainable<T & Record<typeof key, V>>;
    get(): T;
  };

  type LastAssignmentChainable<T = {}> = {
    option<K extends string, V>(key: K, value: V): LastAssignmentChainable<Omit<T, K> & Record<K, V>>;
    get(): T;
  };

  type FirstAssigmentChainable<T = {}> = {
    option<K extends string, V>(key: K, value: V): FirstAssigmentChainable<K extends keyof T ? T : Omit<T, K> & Record<K, V>>;
    get(): T;
  };

  declare const l: LastAssignmentChainable
  declare const s: SingleAssignmentChainable
  declare const f: FirstAssigmentChainable

  // LastAssignmentChainable
  const lastAssigmentResult = l
    .option('foo', '123')
    .option('foo', 123) // this is the value and type of `foo` we want to keep
    .get()

  // FirstAssigmentChainable
  const firstAssignmentResult = f
    .option('foo', '123') // this is the value and type of `foo` we want to keep
    .option('foo', 123)
    .get()

  // SingleAssignmentChainable
  s.option('foo', '123')
   //.option('foo', 123) // this error is expected, yay only one assigment of `foo`
   .get()