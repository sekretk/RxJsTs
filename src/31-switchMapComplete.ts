import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError, combineLatest } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError, timeout } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const startTime = Date.now()

const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

export function switchMapComplete() {

    const destoy$ = new Subject();

    const obs: Observable<number> = of(1).pipe(
        finalize(() => consoleHandler('source finished')('')),
        tap(consoleHandler('source tap 01')),
        switchMap(() => {
            return timer(0,300).pipe(
                take(5),
                finalize(() => consoleHandler(`switched finished`)('')),
                tap(consoleHandler(`switched is `))
            )
        }),
        takeUntil(destoy$),
        finalize(() => consoleHandler('after switched finished')('')),
    )

    setTimeout(destoy$.next.bind(destoy$, true), 700);

    obs.subscribe({
        complete: () => consoleHandler('FULL completed')(''),
        next: consoleHandler('FULL next: '),
        error: consoleHandler('FULL err: ')
    })
}