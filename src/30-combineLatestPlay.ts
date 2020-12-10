import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError, combineLatest } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError, timeout } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const startTime = Date.now()

const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

export function combineLatestPlay() {

    const destoy$ = new Subject();

    const source01: Observable<number> = timer(0, 1000).pipe(
        takeUntil(destoy$),
        finalize(() => consoleHandler('finished 01')('')),
        tap(consoleHandler('tap 01')),
        shareReplay(1),
        //share(),
    )

    const source02: Observable<string> = timer(2000, 1000).pipe(
        map(x =>String(1000+x)),
        takeUntil(destoy$),
        finalize(() => consoleHandler('finished 02')('')),
        tap(consoleHandler('tap 02')),
        shareReplay(1),
        //share(),
    )

    setTimeout(() => combineLatest([source01, source02]).pipe(
        take(3),
        tap(consoleHandler('tap_sub')),
        finalize(() => consoleHandler('finished_sub')('')),
    ).subscribe({
        next: consoleHandler('next_sub'),
        complete: () => consoleHandler('complete_sub')('')
    }), 1500);
}