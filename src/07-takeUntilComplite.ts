import { ReplaySubject, interval, timer, Subject } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay } from "rxjs/operators"

export function takeUNtilCOmplte() {

    const destr = interval(4000)

    const consoleHandler = (_: any) => console.log(_)

    timer(1000, 1000).pipe(
        takeUntil(destr),
        shareReplay(1)
    ).subscribe(consoleHandler, (err) => consoleHandler('err'), () => consoleHandler('comp'))
}