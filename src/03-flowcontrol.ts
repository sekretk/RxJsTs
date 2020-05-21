import { timer, of } from "rxjs";
import { filter, finalize, takeUntil, take, map, timeout, delay, first, tap, share, shareReplay } from "rxjs/operators";

export function flowPlay(){

    const consoleHandler = (_: any) => console.log(_)

    const der = timer(0, 1000).pipe(first(), tap(consoleHandler), shareReplay())
    
    der.subscribe(consoleHandler)

    der.pipe(map(_ => "a")).subscribe(consoleHandler)

    der.pipe(map(_ => "b")).subscribe(consoleHandler)

    der.pipe(map(_ => "c")).subscribe(consoleHandler)
}