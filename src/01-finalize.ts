import { timer, of } from "rxjs";
import { filter, finalize, takeUntil, take, map, timeout, delay } from "rxjs/operators";

export function finalizePlay(){

    const der = of(true).pipe(delay(6000))
    
    der.subscribe(_ => console.log(_))

    const feed =  timer(0, 1000).pipe(takeUntil(der), filter(_ => _%2 ===1),finalize(() => console.log('main finished')))
    feed.pipe(finalize(() => console.log('der finished'))).subscribe(_ => console.log(_))
}