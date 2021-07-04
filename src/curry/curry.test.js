
import { max, slice } from "./curry_2";


describe('Curry2', () => {
    it('Max Function', () => {
        const maxNumber = max([100, 200, 500, 2500]);
        expect(maxNumber).toBe(2500);
    });
    it('Slice Func', () => {
        const result = slice(1)(3)(["a", "b", "c"]);
        expect(result).toStrictEqual(["b", "c"]);
    })
});