import { Observable } from 'rxjs';
var observable = Observable.create((observer:any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
observable.subscribe(
    (x:any) => logItem(x),
    (error: any) => logItem ('Error: ' + error),
    () => logItem('Completed')
);
function logItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}

import { timer, of} from 'rxjs';
import { mapTo, startWith, scan, tap, map, filter, takeLast, takeUntil, takeWhile } from 'rxjs/operators';
import { finalizePlay } from './01-finalize';
import { takeUntilPlay } from './07-takeUntil';

//emit 0 after 1 second then complete, since no second argument is supplied
//const source = timer(1000,1000);
//output: 0
//const subscribe = source.pipe(map(_ => _), scan((acc, curr) => acc+curr, 1),  startWith(444)).subscribe(val => console.log(val));

const source = timer(0, 100)

const terminator = timer(1500)

//source.pipe(takeUntil(terminator)).subscribe(_ => console.log(_))

//finalizePlay()

takeUntilPlay()