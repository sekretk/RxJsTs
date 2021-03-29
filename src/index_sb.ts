type Container = { name: string };

type Predicate<T> = (_: T) => boolean;

//export const referenceEqualer = <T>(first: T, second: T): boolean => first === second;

const referenceEqualer = <T>(first: T) => (second: T): boolean => first === second;

const genericFilter = <T>(condition: Predicate<T>) => (items: Array<T>): Array<T> => items.filter(condition);

const filterByProp = <T, K extends keyof T>(prop: K, condition: Predicate<T[K]>) => (items: Array<T>): Array<T> => items.filter(item => condition(item[prop]));

const propPredicate = <T, K extends keyof T>(prop: K, condition: Predicate<T[K]>) => (item: T): boolean => condition(item[prop]);

const isIncluded = (item: string) => (subscring: string): boolean => item.includes(subscring);

const containsInArray = <T>(predicate: Predicate<T>) => (array: Array<T>): boolean => Boolean(array.find(predicate));

export const non = <T extends ((...args: Array<unknown>) => boolean)>(fun: T) => (...params: Parameters<T>): boolean => !fun(...params);

export const getContainersInHeader = (containers: Array<Container>, heads: Array<string>) =>
    containers.filter(container => heads.find(isIncluded(container.name)));

export const getContainersInBody = (containers: Array<Container>, containersInHeader: Array<Container>) =>
    containers.filter(container => !containersInHeader.find(propPredicate('name', referenceEqualer(container.name))));

export const findHead = (containers: Array<Container>, downloadableContainerName: string) =>
    containers.find(propPredicate('name', isIncluded(downloadableContainerName)));