//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import bodyParser from 'body-parser';


//use of three line of code to get the __dirname:

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var bandName = "";
var password = "ILoveProgramming";

app.use(bodyParser.urlencoded({ extended: true }));

//important to note that the middleware function must be declared before the routes.
function myMiddleware(req, res, next) {
    console.log(req.body);//this is to see what the user has inputted in the form
    bandName = req.body["password"]; //this is to store the user's input in the variable bandName

    next();//this is to move on to the next middleware function or route
}

app.use(myMiddleware);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
}
);


app.post("/check", (req, res) => {
    if (bandName === password) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        //send the user back to the homepage if the password is incorrect:
        res.sendFile(__dirname + "/public/index.html");
    }
}
);


app.listen(port, () => {
    console.log(`Listening on port:${port}`);
}
);

