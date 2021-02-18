import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError, combineLatest } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError, timeout } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const switchMapWithComplete = <T,R>(obsCreator: (x: T) => Observable<R>) => (source: Observable<T>): Observable<R> => {
    return new Observable(subscriber => {
        const subscription = source.subscribe({
          next(value) {
            if(value !== undefined && value !== null) {
              subscriber.next(value);
            }
          },
          error(error) {
            subscriber.error(error);
          },
          complete() {
            subscriber.complete();
          }
        });

        return () => subscription.unsubscribe();
      });
}

const startTime = Date.now()

const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

export function switchMapComplete() {

    const destoy$ = new Subject();

    const obs: Observable<number> = timer(0, 1000).pipe(
        take(2),
        finalize(() => consoleHandler('source finished')('')),
        tap(consoleHandler('source tap 01')),
        switchMapWithComplete(),
        switchMap((i) => {
            return timer(0,300).pipe(
                take(5),
                // map(x => {
                //     if (i === 1 && x === 1) {
                //         throw 'crazy error';
                //     }
                //     return x;
                // }),
                finalize(() => consoleHandler(`switched ${i} finished`)('')),
                tap(consoleHandler(`switched on ${i} to `))
            )
        })
    )

    obs.subscribe({
        complete: () => consoleHandler('FULL completed')(''),
        next: consoleHandler('FULL next: '),
        error: consoleHandler('FULL err: ')
    })
}