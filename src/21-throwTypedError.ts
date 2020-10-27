import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function toThrowTypedError() {

    const dispose$ = new Subject<Boolean>();

    const startTime = Date.now()

    const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

    const source$ = timer(1000, 1000).pipe(
        take(10),
        tap(consoleHandler('tap')),
        takeUntil(dispose$),
        map(i => {
            if (i === 3)
                throw {id: 1, msg: 'some error'}
            else
                return i;
        }),
        catchError(err => {
            consoleHandler('pipe_error')(err);
            return of(99)
        })
        // switchMap(i => {
        //     if (i === 3)
        //         return throwError('errr');
        //     else
        //         return of(i);
        // })
    );


    source$.subscribe(
        {
            next: consoleHandler('next'),
            error: consoleHandler('error'),
            complete: () => consoleHandler('complete')('-'),
        }
    );


}