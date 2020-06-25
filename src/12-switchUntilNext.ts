import { ReplaySubject, interval, timer, Subject, merge, of } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize } from "rxjs/operators"

export function switchUntilNext() {

    const startTime = Date.now()

    const consoleHandler = (_: any) => console.log(`At ${Date.now() - startTime}: ${_}`)

    const toastMessage$ = new Subject<string>();

    const message$ = timer(1000, 1000)
        .pipe(
            take(3),
            map(_ => _+1),
            tap(_ => consoleHandler('orig: ' + _))
        );

    //delayed$.subscribe(consoleHandler)

    message$.pipe(
        switchMap(
            (_: number) => timer(0, 500)
                            .pipe(
                                map(__ => __+1),
                                map(__ => 100 * _ + __), 
                                tap(__ => consoleHandler("in sm: " + __)),
                                finalize(() => consoleHandler("FIN in sm. orig: " + _))
                                )
                )
                )
        .subscribe(_ => consoleHandler('in the end: ' + _));

    //    merge(message$, delayed$).subscribe(consoleHandler);
}