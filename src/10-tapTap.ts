import { ReplaySubject, interval, timer, Subject } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap } from "rxjs/operators"

export function tapTap() {

    const subj = new Subject<string>()

    const consoleHandler = (_: any) => console.log(_)

    subj.pipe(tap(_ => consoleHandler('intap' + _)))

    timer(1000, 1000).subscribe((_) => subj.next("HU"+_));
    
    //subj.subscribe(consoleHandler);
}