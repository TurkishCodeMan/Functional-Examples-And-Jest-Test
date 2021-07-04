import {
    compose,
    pipe, curry,
    filter, reverse,
    map, trim, split, toLower, join
} from "ramda";

function toUpper(str) {
    return str.toUpperCase();
}

function exclaim(str) {
    return str + "!";
}

function first(str) {
    return str[0];
}

const concat = curry(function add(y, x) {
    return x + y;
})

const log = curry(function logger(tag, x) {
    return (console.log(tag, x), x);
});

export const composed = compose(concat("!"), log("here :"), toUpper);

export const shout = compose(first, compose(first, toUpper));

export const pipeShout = pipe(compose(toUpper, first), first);

export const doStuff = compose(
    join(" "),
    filter(x => x.length > 3),
    reverse,
    map(trim),
    split(" "),
    log("AfterLower :"),
    toLower
);

//Aynı şey aslında compose nokta zincirlemedir.Sağdan Sola
const doStuff2 = function (str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(c => c.trim())
        .reverse()
        .filter(x => x.length > 3)
        .join(" ")
}

