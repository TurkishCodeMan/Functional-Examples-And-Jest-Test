

const add = function (x, y) {
    return x + y;
}

const flip = function (fn) {
    return function ([y, x]) {
        return fn(x, y);
    }
}

console.log(add(1, 2))

const toPair = function (fn) {
    return function ([x, y]) {
        return fn(x, y);
    }
}



function curry(fn) {
    return function curried1(x) {
        return function curried2(y) {
            return fn(x, y);
        }
    }
}


const addPointFree = toPair(add);
console.log(addPointFree([2, 3]))


const curriedAdd = curry(add);

const increment = curriedAdd(1);

const result = increment(9);

console.log(result);


//Modulo

const modulo = R.curry(function (x, y) { return y % x });

const isOdd = modulo(2) //(2,y)=>2%y;

const result2 = isOdd(3);

console.log(result2)


//Filter Curry

const filter = R.curry(function filter(fn, arr) { return arr.filter(fn) });

const getOdds = filter(isOdd);


const result3 = getOdds([1, 2, 3, 4, 5]);



console.log(result3)

//Replace STR

const replace = R.curry(function replace(regex, replacement, str) {
    return str.replace(regex, replacement);
})

const replaceVowels = replace(/[AEIOU]/ig, '!');

const result4 = replaceVowels("Hey Merhaba !")

console.log(result4);


//Partial Application

const multiply2 = (a, b) => a * b;
const double = R.partial(multiply2, [2]);
double(2); //=> 4

const greet = (salutation, title, firstName, lastName) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

const sayHello = R.partial(greet, ['Hello']);
const sayHelloToMs = R.partial(sayHello, ['Ms.']);
var result5=sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'

console.log(result5);