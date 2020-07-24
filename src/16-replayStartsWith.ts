import { ReplaySubject, interval, timer, Subject, merge, of } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function replayStartWith() {

    const sub$: ReplaySubject<number> = new ReplaySubject<number>(1);

    sub$.next(123)

    const startTime = Date.now()

    const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${value}`)

    sub$.pipe(
        tap(consoleHandler('tap_replay')),
        switchMap(t => of('a_'+t,'b_'+t,'c_'+t).pipe(startWith('TT_'+t)))
    ).subscribe(consoleHandler('subscriber_'))
}