import { ReplaySubject, interval, timer, Subject, merge, of, Observable, Subscription, throwError } from "rxjs"
import { take, takeUntil, scan, map, tap, shareReplay, switchMap, delay, finalize, observeOn, share, filter, startWith, timeoutWith, catchError } from "rxjs/operators"
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { asap } from "rxjs/internal/scheduler/asap";
import { queue } from "rxjs/internal/scheduler/queue";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";

const terminate = <T>(predicat: (item: T) => boolean) => (source: Observable<T>) => {
    return new Observable(subscriber => {
        const subscription = source.subscribe({
          next(value) {
            subscriber.next(value);
            if (predicat(value)){
                subscriber.complete();
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

export function closeAndEmit() {

    const dispose$ = new Subject<Boolean>();

    const startTime = Date.now()

    const consoleHandler = (prefix: any) => (value: any) => console.log(`At ${Date.now() - startTime}: ${prefix} ${JSON.stringify(value)}`)

    const source$ = timer(1000, 1000).pipe(
        map(x => x),
        tap(consoleHandler('tap')),
        //takeUntil(dispose$),
        terminate(t => t === 3)
    );


    source$.subscribe(
        {
            next: consoleHandler('next'),
            error: consoleHandler('error'),
            complete: () => consoleHandler('complete')('-'),
        }
    );
}