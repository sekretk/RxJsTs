import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError, timeout } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const startTime = Date.now()

const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

export function completeSequence() {

    const destoy$ = new Subject();

    const source = timer(1000, 1000).pipe(
        takeUntil(destoy$),
        finalize(() => consoleHandler('finished')('')),
        tap(consoleHandler('tap')),
        shareReplay(1),
        //share(),
    )

    let deried01: Subscription;
    let deried02: Subscription;

    setTimeout(() => deried01 = source.pipe(
        tap(consoleHandler('tap_sub_01')),
        finalize(() => consoleHandler('finished_derived_01')('')),
    ).subscribe({
        complete: () => consoleHandler('complete_01')('')
    }), 1500);

    setTimeout(() => deried02 = source.pipe(
        tap(consoleHandler('tap_sub_02')),
        finalize(() => consoleHandler('finished_derived_02')('')),
        ).subscribe({
            complete: () => consoleHandler('complete_02')('')
        }), 2500);

    setTimeout(() => destoy$.next(true), 7500);
    setTimeout(() => deried01.unsubscribe(), 2500);
    setTimeout(() => deried02.unsubscribe(), 3500);
}