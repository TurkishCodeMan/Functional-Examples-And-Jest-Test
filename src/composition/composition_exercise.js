import {
    compose, head,curry,
    last, prop, map, replace,
    toLower, filter, join, sortBy, concat,flip
} from "ramda";

function isLastInStack(cars) {
    const lastCar = last(cars);
    return prop('in_stock', lastCar)
}

// function carDollarValue(car) {
//     return car.dollar_value;
// }
//Bu prop('dollar_value') eşittir;

function add(y, x) {
    return x + y;
}

function average(arr) {
    return arr.reduce(add, 0, arr) / arr.length;
}

function formatMoney(v) {
    return '$' + v;
}
function formatDollarValue(v) {
    return compose(formatMoney, prop('dollar_value'))(v);
}

const log = curry(function logger(tag, x) {
    return (console.log(tag, x), x);
});


const underScore = replace(/[W]/g, '_');

export const isLastInStock = compose(prop('in_stock'), last);

export const nameOfFirstCar = compose(prop('name'), head);

export const averageDollarValue = compose(average, map(prop('dollar_value')))

export const sanitizeNames = map(compose(toLower, underScore, prop('name')));
//export const sanitizeNames = compose(map(toLower), map(underScore), map(prop('name')))

/*
    compose(map(f),map(g))=map(compose(f,g))
*/

export const availablePrices = compose(
    map(formatDollarValue),
    filter(prop('in_stock'))
);

export const availablePricesString = compose(
    join(", "),
    availablePrices
); //"$120.000,$40.000"

var append=flip(concat);

export const fastestCar = compose(
    append(' is the fastest car'),
    prop('name'),
    last,
    sortBy(prop('horsePower'))
)



