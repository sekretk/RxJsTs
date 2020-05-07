import { Observable, interval, BehaviorSubject } from 'rxjs';
var observable = Observable.create((observer: any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
observable.subscribe(
    (x: any) => logItem(x),
    (error: any) => logItem('Error: ' + error),
    () => logItem('Completed')
);
function logItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}

import { timer, of } from 'rxjs';
import {
    mapTo, startWith, scan, tap, map, filter,
    takeLast, takeUntil, takeWhile, mergeMap, take, switchMap
} from 'rxjs/operators';

//emit 0 after 1 second then complete, since no second argument is supplied
//const source = timer(1000,1000);
//output: 0
//const subscribe = source.pipe(map(_ => _), scan((acc, curr) => acc+curr, 1),  startWith(444)).subscribe(val => console.log(val));

// const source = timer(0, 100)

// const terminator = timer(1500)

// const rawfeed = interval(3000).pipe(map(x => x % 3))

// const getInstObs = function (inst: number) {
//     return interval(500).pipe(mapTo('insts for ' + inst))
// }

//rawfeed.pipe(switchMap((nnidx: number) => getInstObs(nnidx))).subscribe(x => console.log(x))

//source.pipe(map(_ => _*2),takeUntil(terminator)).subscribe(_ => console.log(_))

//timer(1000, 1000).pipe(scan((acc, curr) => curr%3+1, 0)).subscribe(_ => console.log(_))

//const letters = of('a', 'b', 'c');

//const subObs = interval(1000).pipe(take(3))

// subObs.pipe(
//     mergeMap(x => interval(1000).pipe(map(i => x+i))),
//   ).subscribe(x => console.log(x));
//subObs.subscribe(x => console.log(x));

interface IUserState {
    clientId: number;
    tradebility: boolean;
}

let stateObs = new BehaviorSubject<Partial<IUserState>>({} as Partial<IUserState>)

let finalState = stateObs.pipe(
    scan((acc, curr) => ({ ...acc, ...curr } as IUserState), {} as IUserState),
);

finalState.subscribe(x => console.log(x));

stateObs.next({ clientId: 1 });
stateObs.next({ tradebility: true });
stateObs.next({ clientId: 13 });