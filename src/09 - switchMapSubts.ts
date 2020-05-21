import { ReplaySubject, interval, timer, Subject } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap } from "rxjs/operators"

export function switchMapSub() {

    const exhaust = timer(0, 500)

    const consoleHandler = (_: any) => console.log(_)

    timer(1000, 3000).pipe(
        tap(_ => consoleHandler('hui')),
        switchMap(_ => exhaust.pipe(map(__ => consoleHandler(100*_+__))))
    ).subscribe()
}