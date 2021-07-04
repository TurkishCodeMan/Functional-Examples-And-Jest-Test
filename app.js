import { composed, doStuff } from "./src/composition/composition.js"
function init() {
    var composedResult=composed("hüseyin");
    console.log(composedResult);

    var doStuffRes=doStuff("Deneme artık yeter");
    console.log(doStuffRes)
}
init();