//https://github.com/type-challenges/type-challenges/issues/601

// Pop
type Pop<T extends any[]> = T extends [...infer R, any] ? R : never;

// Push (V can be single value, tuple, or array)
type Push<T extends any[], V> = V extends any[] ? [...T, ...V] : [...T, V];

// Shift
type Shift<T extends any[]> = T extends [any, ...infer R] ? R : never;

// Unshift (V can be single value, tuple, or array)
type Unshift<T extends any[], V> = V extends any[] ? [...V, ...T] : [V, ...T];

type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Unshift<arr2, 3>