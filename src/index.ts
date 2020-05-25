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

switchUntilNext()
      

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