import { Either, Id, Task } from "../lib/types";
import fs from "fs";
import path from "path";
import { List,Map } from "immutable-ext";

//Old
function oldApp() {
    return fs.readFile(path.resolve(__dirname, './config.json'), 'utf-8', (err, contents) => {
        console.log(err, contents);
        if (err) throw err;

        const newContents = contents.replace(/3/g, '6');

        fs.writeFile('config1.json', newContents, (err, _) => {
            if (err) throw err;

            console.log("success")
        })
    })
}


function readMyFile(folderPath, enc) {
    return Task((rej, res) => fs.readFile(path.resolve(__dirname,folderPath), enc, (err, contents) =>
        err ? rej(err) : res(contents)
    ))
}



function writeMyFile(path, content) {
    return Task((rej, res) => fs.writeFile(path, content, (err, contents) =>
        err ? rej(err) : res(contents)
    ))
}

function getPost(id){
    return Task((rej,res)=>res({title:"Han",id:1}));
}


export function app() {
    return readMyFile('./config.json', 'utf-8') //Task(contents)
        .map(contents => contents.replace(/3/g, '6'))
        .chain(newContents => writeMyFile('config1.json', newContents))

}

export function postTitle(id){
    return getPost(id)
           .map(post=>post.title.toUpperCase());
}

export function commentForPost(id){
    return getPost(id)
        .chain(post=>
            getComments(post) //Task(comments)
            .map(comments=>Object.assign({comments},post))
        
        )//Task(postWithComments)
}

export function getHref(){
    return Task((rej,res)=>res(location.href));
}

Task.of(2).map(two=>two*2).fork(console.log,console.log);//4
Either.of(2).map(two=>two*2).fold(console.log,console.log);//4
var res=List.of(2).map(two=>two*2).toJS();//4
console.log(res)
