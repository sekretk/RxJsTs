import { ReplaySubject, interval, timer, Subject, merge, of } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

export function schedulerPlay() {

    const startTime = Date.now()

    const consoleHandler = (_: any) => () => console.log(`At ${Date.now() - startTime}: ${_}`)

    const obs$= of(0);

    obs$.pipe(tap(consoleHandler('tap - default'))).subscribe(consoleHandler('default'))
    obs$.pipe(observeOn(asap), tap(consoleHandler('tap - asap'))).subscribe(consoleHandler('asap'))
    obs$.pipe(observeOn(queue), tap(consoleHandler('tap - queue'))).subscribe(consoleHandler('queue'))
    obs$.pipe(observeOn(async), tap(consoleHandler('tap - async'))).subscribe(consoleHandler('async'))
    obs$.pipe(observeOn(animationFrame), tap(consoleHandler('tap - anime'))).subscribe(consoleHandler('animation'))

    setTimeout(consoleHandler('timeout'))

    Promise.resolve(0).then(consoleHandler('promise'))

    requestAnimationFrame(consoleHandler('anim_call'))

    consoleHandler('callstack')()
}