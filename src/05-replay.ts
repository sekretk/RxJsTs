import { ReplaySubject, interval, timer, Subject } from "rxjs"
import { take, takeUntil } from "rxjs/operators"

export function playReplay(){

    const consoleHandler = (_: any) => console.log(_)
    const repSub = new ReplaySubject<number>(1)

    const destroy = new Subject();

    //timer(0, 1000).pipe(takeUntil(destroy)).subscribe(_ => repSub.next(_))

    interval(5000).pipe(take(1)).subscribe(_ => {
        destroy.next()
        consoleHandler('subss')
        repSub.subscribe(consoleHandler)
    })
}