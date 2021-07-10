import fs from "fs";
import path from "path";
function Right(x) {
    return {
        chain: f => f(x),
        map: f => Right(f(x)),
        fold: (f, g) => g(x),
        toString: `Right (${x})`
    }
}

function Left(x) {
    return {
        chain: f => Left(x),
        map: f => Left(x),
        chain:f=>Left(x),
        fold: (f, g) => f(x),
        toString: `Left (${x})`
    }
}

function findColor(name) {
    return fromNullable({
        red: '#ff4444',
        blue: '#3B5998',
        yellow: '#fff68f'
    }[name]);
}

function fromNullable(x) {
    return x != null ? Right(x) : Left();
}

//Old Method
function oldGetPort() {
    try {
        const str = fs.readFileSync(path.resolve(__dirname, "./config.json"));
        const config = JSON.parse(str);
        return config.port;
    } catch (error) {
        return 3001;
    }
}

function tryCatch(fn) {
    try {
        return Right(fn());
    } catch (error) {
        return Left(error);
    }
}

function readFileSync(folderPath) {
    return tryCatch(() => fs.readFileSync(path.resolve(__dirname, folderPath)));
}

function parseJSON(contents){
    return tryCatch(()=>JSON.parse(contents));
}


export const getPort = function () {
    var e=readFileSync("./config.json");
    console.log(e)
    return readFileSync("./config.json")
        .chain(contents => parseJSON(contents))
        .map(config => {
            console.log(config);
            return config.port
        })
        .fold(() => 'No Port', x => x);
}


export const finderColor = function finder(name) {
    return findColor(name)
        .map(x => x.toUpperCase())//Sadece sağ değerde function çalışır yoksa x i döner
        .fold(
            x => 'Not Found Color',
            x => x
        );
}