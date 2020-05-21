import { ReplaySubject, interval, timer, Subject, merge, of } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay } from "rxjs/operators"

export function switchMerge() {

    const startTime = Date.now()

    const consoleHandler = (_: any) => console.log(`At ${Date.now() - startTime}: ${_}`)

    const toastMessage$ = new Subject<string>();

    const message$ = toastMessage$
        .pipe(
            tap(_ => consoleHandler('requested: '+_))
        );

        //delayed$.subscribe(consoleHandler)

    message$.pipe(switchMap(_ => merge(of(_), of('cancel'+_).pipe(delay(1000)))))
        .subscribe(_ => consoleHandler('result: '+_));

    //    merge(message$, delayed$).subscribe(consoleHandler);

    setTimeout(() => toastMessage$.next('1'), 500)
    setTimeout(() => toastMessage$.next('2'), 5500)
    setTimeout(() => toastMessage$.next('2'), 6500)
}