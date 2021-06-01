import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError, combineLatest, from, NEVER, concat } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError, timeout, bufferWhen, bufferTime, first, skip, audit } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const startTime = Date.now()

const consoleHandler = (prefix: any) => (value?: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

export function auditPlay() {

    const obs = interval(1000).pipe(map(x => 'O_' + x));

    interval(300).pipe(
        map(x => 'IN_' + x),
        audit((xxx) => interval(1050).pipe(tap(consoleHandler('AUD_'+xxx)))),
        take(20)
        )
    .subscribe({
        complete: consoleHandler('complete'),
        next: consoleHandler('next'),
    });
}