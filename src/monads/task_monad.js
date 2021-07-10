import { compose } from "ramda";
import {Task} from "../lib/types";


export function Box(fn){
    return {
        map:function (g){
            return Box(compose(fn,g));
        },
        fold:fn
    }
}

Task.of(2).map(two=>two*2).fork(console.error,console.log);//4


var tl=Task((rej,res)=>res(2))
       .map(two=>two+1)
       .map(three=>three*2)

tl.fork(console.error,console.log) //6





