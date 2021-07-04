import {composed} from "./composition";

describe("Composition",()=>{
    test("basic composed",()=>{
        var result=composed("ali");
        expect(result).toBe("ALI!");
    })
})