
import { composed, shout, pipeShout } from "./composition";
import { availablePrices, averageDollarValue, fastestCar, isLastInStock, nameOfFirstCar, sanitizeNames } from "./composition_exercise"

describe("Composition", () => {
    test("basic composed", () => {
        var result = composed("ali");
        expect(result).toBe("ALI!");
    });
    test("shout composed", () => {
        var result = shout("ali");
        expect(result).toBe("A");
    });
    test("pipeShout", () => {
        var result = pipeShout("ali");
        expect(result).toBe("A");
    });

    test("car_ex", () => {
        var result = isLastInStock([
            { in_stock: 'henüz yok', },
            { in_stock: 'aaa' },
            { in_stock: 'bbb' },
        ]);
        expect(result).toBe('bbb');
    });

    test("car_name", () => {
        var result = nameOfFirstCar([
            { name: 'bmw', in_stock: 'henüz yok', },
            { in_stock: 'aaa' },
            { in_stock: 'bbb' },
        ]);
        expect(result).toBe('bmw');
    });

    test("avegare_car_dollar_value", () => {
        var result = averageDollarValue([
            { name: 'bmw', dollar_value: 120.000 },
            { name: 'ford', dollar_value: 40.000 },
            { name: 'bmc', dollar_value: 20.000 },
        ]);
        expect(result).toBe(60.000);
    });

    test("sanitize_names", () => {
        var result = sanitizeNames([
            { name: 'BMW', dollar_value: 120.000 },
            { name: 'ford', dollar_value: 40.000 },
            { name: 'bmc', dollar_value: 20.000 },
        ]);

        expect(result).toStrictEqual(['bm_', 'ford', 'bmc']);
    });

    test("available_prices", () => {
        var result = availablePrices(
            [
                { in_stock: true, dollar_value: "120.000" },
                { in_stock: true, dollar_value: "40.000" },
                { in_stock: false, dollar_value: "20.000" },
            ]
        )
        expect(result).toStrictEqual(["$120.000", "$40.000"])
    });

    test("fastest_car", () => {
        var result = fastestCar([
            { name: 'bmw', horsePower: 120 },
            { name: 'ford', horsePower: 90 },
            { name: 'fiat', horsePower: 75 },
        ]);


        expect(result).toBe("bmw is the fastest car");
    })

});
