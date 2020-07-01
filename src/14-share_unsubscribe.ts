import { ReplaySubject, interval, timer, Subject, merge, of } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function shareFinalizy() {

    const startTime = Date.now()

    const consoleHandler = (_: any) => () => console.log(`At ${Date.now() - startTime}: ${_}`)

    const obs$= timer(0, 1000).pipe(take(5), tap(consoleHandler('tap')), finalize(consoleHandler('finalaze')), share())

    const sub1 = obs$.subscribe(consoleHandler('sub1'))
    const sub2 = obs$.subscribe(consoleHandler('sub2'))

    setTimeout(() => {
        consoleHandler('unsub')()
        sub1.unsubscribe();
        sub2.unsubscribe();
    }, 1500)

    setTimeout(() => {
        obs$.subscribe(consoleHandler('sub3'))
    }, 2500)
}