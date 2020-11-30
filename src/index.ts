import { Observable } from 'rxjs';
var observable = Observable.create((observer:any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
observable.subscribe(
    (x:any) => logItem(x),
    (error: any) => logItem ('Error: ' + error),
    () => logItem('Completed')
);
function logItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}

import { timer, of} from 'rxjs';
import { mapTo, startWith, scan, tap, map, filter, takeLast, takeUntil, takeWhile } from 'rxjs/operators';
import { finalizePlay } from './01-finalize';
import { flowPlay } from './03-flowcontrol';
import { behaviorSwitchPlay } from './04-behaviorSwitch';
import { playReplay } from './05-replay';
import { scanOplay } from './06-scan2Play';
import { takeUNtilCOmplte } from './07-takeUntilComplite';
import { switchMapSub } from './09 - switchMapSubts';
import { tapTap } from './10-tapTap';
import { switchMerge } from './11-swithcMerge';
import { finalizeShare } from './11-finalizeShare';
import { switchUntilNext } from './12-switchUntilNext';
import { schedulerPlay } from './13-scheduler';
import { shareFinalizy } from './14-share_unsubscribe';
import { startsWithPlay } from './14-startsWith';
import { krikz } from './15-krikz';
import { shareSubscribe } from './16-replayStartsWith';
import { playTimer } from './17-timer';
import { timeoutWithPlay } from './19-timeoutWith';
import { toPromisePlay } from './20-toPromisePlay';
import { recursivePromise } from './18-recursivePromise';
import { toThrowError } from './21-throwError';
import { toThrowTypedError } from './21-throwTypedError';
import { toThrowErrorForMany } from './23-throwError4MultipleSubs';
import { promiseAfterResolve } from './24-promiseAfterResolve';
import { closeAndEmit } from './25-closeAndEmit';
import { shareReplayArgument } from './26-shareReplayArgument';
import { pipeWithCustomOperator } from './27-customOperator';
import { completeSequence } from './29-completeSequence';
import { combineLatestPlay } from './30-combineLatestPlay';

//emit 0 after 1 second then complete, since no second argument is supplied
//const source = timer(1000,1000);
//output: 0
//const subscribe = source.pipe(map(_ => _), scan((acc, curr) => acc+curr, 1),  startWith(444)).subscribe(val => console.log(val));

const source = timer(0, 100)

const terminator = timer(1500)

//source.pipe(takeUntil(terminator)).subscribe(_ => console.log(_))

//finalizePlay()

//flowPlay()

//behaviorSwitchPlay()

//playReplay()

//scanOplay()

//takeUNtilCOmplte()

//switchMapSub()

//tapTap()

//switchMerge()

//finalizeShare()

//switchUntilNext()

//schedulerPlay()

//shareFinalizy()

//startsWithPlay()

//replayStartWith();

// create(message: Uint8Array, nestedMsgType: number): [Observable<any>, () => void] {
//     // ...
//     const destroyed$ = new Subject<boolean>();
//     const stopHandler = () => {
//       // Some needed logic...
//       destroyed$.next(true);
//     }:
//     return [this.obs$.pipe(
//       takeUntil(destroyed$)
//       filter(([ id ]) => id === requestId),
//       map(([ , responseEnvelope ]) => responseEnvelope.nestedMessage.value),
//     ), stopHandler];
//   }


//krikz()

//shareSubscribe();

//playTimer();

//timeoutWithPlay();

//toPromisePlay();

// type Strings = [string, string];
// type Numbers = [number, number];

// // [string, string, number, number, boolean]
// type StrStrNumNumBool = [...Strings, ...Numbers, boolean];

// declare function Currying<F extends (...args: any[]) => any>(fn: F): Currying1<F>

// type Currying1<F extends (...args: any[]) => any> = F extends (first: infer First, ...rest: infer Rest) => infer FunctionImplementation
//   ? unknown extends First ? FunctionImplementation : (a: First) => Currying1<(...rest: Rest) => FunctionImplementation>
//   : never;

// const add = (a: number, b: string, c: boolean): string => a + b

// const tt = Currying(add)(1)('2')

// type DeepReadonly<T> = T extends never
//   ? T
//   : {
//       readonly [k in keyof T]: DeepReadonly<T[k]>
//     };


// type someType = {
//     a: string,
//     b: number,
//     c: {
//         d: boolean,
//         e: Array<number>
//     }
// }

// type roType = DeepReadonly<someType>

// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

//const rr: ReturnType<(r: string) => string>;

// recursivePromise(200)(5)
//     .then((c) => console.log('resolved: ' + c) )
//     .catch(err => console.log('reject ' + err))

//toThrowError()

//toThrowTypedError()

//toThrowErrorForMany()

//setTimeout(() => promiseAfterResolve(), 1000)

//closeAndEmit()

//shareReplayArgument();


//pipeWithCustomOperator();

//completeSequence();

combineLatestPlay();
