import { compose, trim } from "ramda";

function Box(x) {
    return {
        map: function mapper(f) {
            return Box(f(x));
        },
        toString: `Box${x}`,
        fold:function folder(f){
            return f(x);
        }
    }
}

function first(xs){
    return xs[0];
}


function nextCharForNumberString(str) {
    return Box(str)
        .map(x => x.trim())
        .map(x => parseFloat(x, 10))
        .map(number => new Number(number + 1))
        .fold(String.fromCharCode)
}


function halfTheFirstLargeNumber(arr){
    return Box(arr)
           .map(v=>v.filter(x=>x>=20))
           .map(found=>first(found)/2)
           .fold(answer=>`The Answer is ${answer}`)
}


export const result = nextCharForNumberString('  64');
export const result2=halfTheFirstLargeNumber([1,4,50]);


