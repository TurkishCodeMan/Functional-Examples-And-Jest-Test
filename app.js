//import { composed, doStuff } from "./src/composition/composition.js"
//import { Box } from "./src/monads/task_monad"
//import { app } from "./src/monads/either_monad_exercise"
// import {exercise} from "./src/monad_pattern/exercise"
import { app } from "./src/weather/weather";
function init() {
    // var composedResult=composed("hüseyin");
    // console.log(composedResult);

    // var doStuffRes=doStuff("Deneme artık yeter");
    // console.log(doStuffRes)

    // var res=Box(()=>2).map(two=>two+1).fold();
    // console.log(res)

    //app().fork(console.error,()=>console.log("success"))

    app();
}
init();