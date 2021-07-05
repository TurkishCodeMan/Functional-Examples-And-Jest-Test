function Box(x) {
    return {
        map: function mapper(f) {
            return Box(f(x));
        },
        toString: `Box${x}`,
        fold: function folder(f) {
            return f(x);
        },
        chain:function chained(f){
            return f(x);
        }
    }
}


export function moneyToFloat(str) {
    return Box(str)
        .map(s => s.replace(/\$/, ''))
        .fold(s => parseFloat(s))
}

export function percentToFloat(str) {
    return Box(str)
        .map(v => str.replace(/\%/, ''))
        .map(v => parseFloat(v))
        .fold(v => v * 0.0100);
}

function oldApplyDiscount(price, discount) {
    const cents = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cents - (cents * savings);
}

export function applyDiscount(price, discount) {
    return Box(moneyToFloat(price))
        .fold(cents =>  
            Box(percentToFloat(discount))
                .fold(savings => cents - cents * savings)
        )
}

export function newApplyDiscount(price, discount) {
    return Box(moneyToFloat(price))
        .chain(cents =>  //Chain->>> Box(Box(x)
            Box(percentToFloat(discount))
                .map(savings => cents - cents * savings)
        ).fold(x=>x)
}