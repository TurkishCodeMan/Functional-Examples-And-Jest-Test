
import { curry, reduce, map } from "ramda";

const split = curry(function splitter(delimiter, string) {
    return string.split(delimiter);
});

const words = split(" ")

//Exercise 2
function keepHighest(x, y) {
    return x >= y ? x : y;
}

export function max(arr) {
    return reduce(keepHighest, 0, arr);
}

export const slice=curry(function sliced(start,end,xs){
    return xs.slice(start,end)
});
