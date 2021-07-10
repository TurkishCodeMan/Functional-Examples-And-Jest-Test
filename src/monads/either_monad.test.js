
import { finderColor, getPort } from "./either_monad";
import { parseDbUrl, street, streetName } from "./either_monad_exercise";

describe("Either Monad Test", () => {

    test('finderColor', () => {
        var result = finderColor('red');
        expect(result).toBe('#FF4444');
    });

    test("getPort",()=>{
        var result=getPort();
        expect(result).toBe(3000)
    });

    test("getStreet",()=>{
        var result=street({address:"hekimhan"});
        expect(result).toBe('hekimhan')
    });

    test("getStreetName",()=>{
        var result=streetName({address:{name:'hekimhan'}});
        expect(result).toBe('hekimhan');
    });
    
    test("parseDbUrl",()=>{
        var result=parseDbUrl('{"url":"dmee44"}');
        expect(result).toBe('no match');
    })
})