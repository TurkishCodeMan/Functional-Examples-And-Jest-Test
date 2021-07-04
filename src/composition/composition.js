import {compose}from "ramda";

function toUpper(str) {
    return str.toUpperCase();
}

function exclaim(str) {
    return str + "!";
}

function first(arr) {
    return arr[0];
}

export const composed=compose(exclaim,toUpper);