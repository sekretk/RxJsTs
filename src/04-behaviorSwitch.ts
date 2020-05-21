import { timer, of, BehaviorSubject, interval } from "rxjs";
import { filter, finalize, takeUntil, take, map, timeout, delay, first, tap, share, shareReplay, switchMap } from "rxjs/operators";

export function behaviorSwitchPlay(){

    const consoleHandler = (_: any) => console.log(_)
    const behSub = new BehaviorSubject<number>(111)

    interval(2000).pipe(
        switchMap(_ => behSub.pipe(map(__ => _+__)))
    ).subscribe(consoleHandler)
}