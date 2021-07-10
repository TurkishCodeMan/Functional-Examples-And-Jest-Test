import { app, postTitle } from "./task_monad_ex";

describe("Task Monad Test", () => {

    // test('reader', () => {
    //     app().fork(console.error,()=>console.log("success"))


    // });


    test('postTitle',()=>{
        var result=postTitle(1).fork(console.error,x=>x);
        expect(result).toBe("HAN")
    })

})