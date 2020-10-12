export const recursivePromise = (timer = 200) =>
    (nbTry = 4): Promise<number> => {
                return new Promise((resolve, reject) => {
                    if (nbTry === 0) {
                        reject('try to get to many times');
                    }
                    setTimeout(() => {
                        const target = Math.random();
                        if (target < 0.1) {
                            resolve(target);
                        } else {
                            resolve(recursivePromise(timer)(nbTry-1));
                        }
                    }, timer);
                });
            };
