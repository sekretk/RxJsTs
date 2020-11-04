import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function shareReplayArgument() {

    const dispose$ = new Subject<Boolean>();

    const startTime = Date.now()

    const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

    const source$ = timer(1000, 1000).pipe(
        take(10),
        tap(consoleHandler('tap')),
        shareReplay(1),
    );


    source$.subscribe(
        {
            next: consoleHandler('1_next'),
            error: consoleHandler('1_error'),
            complete: () => consoleHandler('1_complete')('-'),
        }
    );

    setTimeout(() => {
    source$.subscribe(
        {
            next: consoleHandler('2_next'),
            error: consoleHandler('2_error'),
            complete: () => consoleHandler('2_complete')('-'),
        }
    );
  }, 2500)

}