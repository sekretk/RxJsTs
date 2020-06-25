import { timer, of, Subject, interval } from "rxjs";
import { filter, finalize, takeUntil, take, map, timeout, delay, tap, share, shareReplay } from "rxjs/operators";

export function takeUntilPlay(){

  const consoleHandler = (_: any) => console.log(_);

  const der: Subject<Boolean> = new Subject<boolean>()

  let feed = timer(0, 1000).pipe(
      tap(_ => console.log('BEFORE ' + _)),
      
      share(),   
      tap(_ => console.log('AFTER ' + _)),   
    )

    const firstSub = feed.pipe(
      map(_ => 'FS:'+_)
    )

    const secondSub = feed.pipe(
      map(_ => 'SS:'+_),
      takeUntil(der),
    )
    

    interval(2100).pipe(take(1)).subscribe(() => {
      // feed = null
       der.next(true)
    })

    secondSub.subscribe(consoleHandler)
    firstSub.subscribe(consoleHandler)
    
}