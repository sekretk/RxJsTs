import { ReplaySubject, interval, timer, Subject, merge, of } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, share, finalize, first, publish, refCount } from "rxjs/operators"

export function finalizeShare() {

    const startTime = Date.now()

    const consoleHandler = (_: any) => console.log(`At ${Date.now() - startTime}: ${_}`)

    const originalSource = timer(0, 1000).pipe(
        take(5),
        takeUntil(of(true).pipe(delay(700))),
        tap(_ => consoleHandler('orig ' + _)),
        finalize(() => consoleHandler('fin-orig')),
        share()
    )

    //const sub0 = originalSource.subscribe(consoleHandler)
    const sub1 = originalSource.pipe(
        map(_ => "Sub1 " + _),
        takeUntil(of(true).pipe(delay(2200))),
        finalize(() => consoleHandler('fin-sub1'))
    ).subscribe(consoleHandler)
    const sub2 = originalSource.pipe(
        map(_ => 'Sub2 ' + _),
        takeUntil(of(true).pipe(delay(1100))),
        finalize(() => consoleHandler('fin-sub2'))
    ).subscribe(consoleHandler)
}