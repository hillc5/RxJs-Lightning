
let observable = Rx.Observable.create(observer => {
    observer.onNext('Tom');
    observer.onNext('Dick');
    observer.onNext('Jane');
    observer.onCompleted();
});

observable
    .filter(el => el.length ===4)
    .map(el => el + ' is Cool!')
    .forEach(el => { console.log(el); });

// function get() {
//     return Rx.Observable.create(observer => {
//         let req = new XMLHttpRequest();
//
//         req.open('GET', 'https://api.github.com/users/netflix');
//
//         req.onload = function() {
//             if (req.status === 200) {
//                 observer.onNext(req.response);
//                 observer.onCompleted();
//             } else {
//                 observer.onError(new Error(req.statusText));
//             }
//         };
//
//         req.onerror = function() {
//             observer.onError('Unknown Error');
//         }
//
//         req.send();
//     })
// }
//
// let netflix = get();
// let numFlix = netflix.map(result => 42);
// netflix.forEach(result => { console.log(result); });
// numFlix.forEach(result => { console.log(result); });

Rx.Observable.from(['Tom', 'Dick', 'Harry'])
    .filter(name => name.length >= 4)
    .map(name => `${name} is cool`)
    .forEach(name => { console.log(name); });

let rangeObs = Rx.Observable.range(1, 10);

console.log('Range!!');
rangeObs
    .filter(element => element % 2 === 0)
    .subscribe(element => { console.log(element); });


console.log('CREATE');

let obs = Rx.Observable.create(observer => {
    let val = 0;
    while (val < 10) {
        observer.onNext(val++);
    }
    observer.onCompleted();
});

obs.subscribe(x => { console.log(x); });

function print(x) {
    console.log(x);
}

// let cnct = Rx.Observable.range(0, 3)
//     .map(x => {
//         console.log(`Value being mapped: ${x}`)
//         return Rx.Observable.range(x, 3);
//     })
//     .concatAll();
//
// cnct.forEach(x => {
//     print(x);
// });

console.log('Interval');

let inv1 = Rx.Observable.interval(100).map(x => `src1${x}`).take(5);
let inv2 = Rx.Observable.interval(200).map(x => `src2${x}`).take(5);

Rx.Observable.merge(inv1, inv2).subscribe(print);
//Rx.Observable.concat(inv1, inv2).subscribe(print);
//Rx.Observable.zip(inv1, inv2).subscribe(print);
//Rx.Observable.combineLatest(inv1, inv2).subscribe(print);
