import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function shareSubscribe() {

    const sub$: Subject<number> = new Subject<number>();

    sub$.next(123)

    const startTime = Date.now()

    const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${value}`)

    const resultFlux$ = sub$.pipe(
        tap(consoleHandler('tap_')),
        shareReplay(1),
    );

    let i = 100;

    let interval = setInterval(() => {
        sub$.next(i++)

        if (i > 110)
            clearInterval(interval)
    }, 1000)

    let sub1$: Subscription;
    let sub2$: Subscription;
    let sub3$: Subscription;

   setTimeout(() => { 
        sub1$ = resultFlux$.subscribe(consoleHandler('sub_1_'))
    }, 1500);

    setTimeout(() => { 
        sub2$ = resultFlux$.subscribe(consoleHandler('sub_2_'))
    }, 2500);

    setTimeout(() => { 
        sub1$.unsubscribe();
        sub2$.unsubscribe();
    }, 3500);

    setTimeout(() => { 
        sub3$ = resultFlux$.subscribe(consoleHandler('sub_3_'))
    }, 5500);
    
}