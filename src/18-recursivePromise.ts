export const recursiveDomSelector = (timer= 200) =>
    (nbTry = 4) =>
        <T>(source) =>
            (selector: string): Promise<T> => {
                return new Promise((resolve, reject) => {
                    if (nbTry === 0) {
                        reject('try to get selector to many times');
                    }
                    setTimeout(() => {
                        const target: T = source.querySelector(selector);
                        if (target) {
                            resolve(target);
                        } else {
                            resolve(recursiveDomSelector(timer)(nbTry - 1)<T>(source)(selector));
                        }
                    }, timer);
                });
            };
