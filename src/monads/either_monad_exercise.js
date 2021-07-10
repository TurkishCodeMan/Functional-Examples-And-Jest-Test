import { Task, Either, Id } from "../lib/types";
const { Right, Left, fromNullable } = Either;
import { List, Map } from "immutable-ext";
// function Right(x) {
//     return {
//         chain: f => f(x),
//         map: f => Right(f(x)),
//         fold: (f, g) => g(x),
//         toString: `Right (${x})`
//     }
// }

// function Left(x) {
//     return {
//         chain: f => Left(x),
//         map: f => Left(x),
//         chain: f => Left(x),
//         fold: (f, g) => f(x),
//         toString: `Left (${x})`
//     }
// }
// //--Ramda Helpers
// function fromNullable(x) {
//     return x != null ? Right(x) : Left();
// }

function jsonParser(contents) {
    return tryCatch(() => JSON.parse(contents));
}

function logIt(x){
    console.log(x);
    return x;
}


function tryCatch(fn) {
    try {
        return Right(fn());
    } catch (error) {
        return Left(error);
    }
}

//Old
function oldStreet(user) {
    const address = user.address;
    return address ? address.street : 'no street';
}


export function street(user) {
    return fromNullable(user.address)
        .map(address => address)
        .fold(() => 'no address', address => address)
}

//old
function oldStreetName(user) {
    const address = user.address;

    if (address) {
        const street = address.street;

        if (street)
            return street.name;
    }

    return "no address";
}

export function streetName(user) {
    return fromNullable(user)
        .chain(user => fromNullable(user.address))
        .map(address => address.name)
        .fold(() => 'no address', name => name)
}

var DB_REGEX = 'deneme';

//Old 
function oldParseDbUrl(cfg) {
    try {
        const c = JSON.parse(cfg);
        return c.url.match(DB_REGEX);
    } catch (error) {
        return error;
    }
}

export function parseDbUrl(cfg) {
    return jsonParser(cfg)
        .map(c => c.url.match(DB_REGEX))
        .chain(c => fromNullable(c))
        .fold((err) => 'no match', c => c);
}

//Old
function oldStartApp(cfg) {
    const parsed = parseDbUrl(cfg);

    if (parsed) {
        const [_, user, password, db] = parsed;
        return `starting ${db},${user},${password}`
    } else {
        return 'no config'
    }
}

export function startApp(cfg) {
    return fromNullable(parseDbUrl(cfg))
        .map(([_, user, password, db]) => `starting ${db},${user},${password}`)
        .fold(() => 'no config', x = x)
}


function greaterThan5(x){
    return x.length>5?Right(x):Left('not greater than 5');
}

function looksLikeEmail(x){
    return x.match(/@/ig)?Right(x):Left("Not an Email")
}

const email="denme@gmail.com"


const res=List([greaterThan5,looksLikeEmail]).traverse(Either.of,v=>v(email));

res.fold(console.log,x=>console.log(x.toJS()))