import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const startTime = Date.now()

const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

export const customOperator = <T>(completeHandler: () => void) => (source: Observable<T>): Observable<T> => {
    return new Observable(subscriber => {

        const logger = consoleHandler('Custom Operator');

        logger('ctr');

        const subscription = source.subscribe({
            next(value) {
                logger('next');
                subscriber.next(value);
            },
            error(error) {
                logger('error');
                subscriber.error(error);
            },
            complete() {
                if (completeHandler) completeHandler();

                logger('complete');
                subscriber.complete();
            },
        });

        return subscription;
    });
};

export function pipeWithCustomOperator() {

    const source$ = timer(1000, 1000).pipe(
        take(3),
        tap(consoleHandler('tap_befor_custom')),
        customOperator(() => consoleHandler('complete handler')('-')),
        tap(consoleHandler('tap_after_custom')),
        finalize(() => consoleHandler('finally')('-')),
        share()
    );


    const sub01 = source$.subscribe(
        {
            next: consoleHandler('1_sub'),
            error: consoleHandler('1_error'),
            complete: () => consoleHandler('1_complete')('-'),
        }
    );

    // const sub02 = source$.subscribe(
    //     {
    //         next: consoleHandler('2_sub'),
    //         error: consoleHandler('2_error'),
    //         complete: () => consoleHandler('2_complete')('-'),
    //     }
    // );

    setTimeout(() => {
        sub01.unsubscribe();
        //sub02.unsubscribe();
  }, 2500)

  setTimeout(() => {
    source$.subscribe(
        {
            next: consoleHandler('3_sub'),
            error: consoleHandler('3_error'),
            complete: () => consoleHandler('3_complete')('-'),
        })
}, 5000)
}