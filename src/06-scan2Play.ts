import { ReplaySubject, interval, timer, Subject } from "rxjs"
import { take, takeUntil, scan, map } from "rxjs/operators"

interface IObject {
    idx: number
}

export function scanOplay() {

    const consoleHandler = (_: any) => console.log(_)
    const repSub = new ReplaySubject<number>(1)

    const destroy = new Subject();



    const foldRequests = function
        ([currentRequest, token]: [IObject, string], newRequest: IObject): [IObject, string] {

             //stop
        if (!Boolean(newRequest)){

            return [ null, null ];
        }

        if (Boolean(token))
            {
                
            }
        else
            token = '1'
        return [ currentRequest, token ];

    }

    timer(0, 1000).pipe(
        map(_ => ({ idx: _ } as IObject)),
        scan<IObject, [IObject, string]>(foldRequests, [null, null] as [IObject, string])).subscribe(consoleHandler)
}