import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function timeoutWithPlay() {

    const dispose$ = new Subject<Boolean>();

    const startTime = Date.now()

    const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${value}`)

    timer(10000).pipe(
        takeUntil(dispose$),
        timeoutWith(1000, of(1111))
    ).subscribe(
        consoleHandler('Timer subscription: '),
        null,
        () => consoleHandler('timerClosed')('finished')
    )

    setTimeout(() => dispose$.next(true), 500);

}