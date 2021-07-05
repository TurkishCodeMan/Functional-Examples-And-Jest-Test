import { applyDiscount, moneyToFloat, newApplyDiscount, percentToFloat } from "./funtor_exercise";

describe("Functor Test", () => {
    test('functor_ex', () => {
        var result = moneyToFloat('$5.00');
        expect(result).toBe(5);
    });

    test("percentToFloat",()=>{
        var result=percentToFloat('20%');
        expect(result).toBe(0.2);
    });

    test("applyDiscount",()=>{
        var result=applyDiscount('$5.00','20%');
        expect(result).toBe(4);
    });
    
    test("newApplyDiscount",()=>{
        var result=newApplyDiscount('$5.00','20%');
        expect(result).toBe(4);
    })
})