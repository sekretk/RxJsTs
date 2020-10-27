import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";


let startTime: number;

const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

let prom: Promise<number>;

function getProm():  Promise<number> {
    if (prom){
        consoleHandler('InPromGet')('reuse');
        return prom
    }

    consoleHandler('InPromGet')('create');

    return prom = new Promise((resolve) => {
        consoleHandler('InPromGet')('doWork');
        setTimeout(() => resolve(42), 1000)
    })
}

export function promiseAfterResolve() {

    startTime = Date.now()

    getProm().then(consoleHandler('direct'))

    setTimeout(() => getProm().then(consoleHandler('middle')), 500)

    setTimeout(() => getProm().then(consoleHandler('after')), 2000)

    prom.then(consoleHandler('in-code'))
}