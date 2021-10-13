const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const arr = [];
let i = 0;
app.use('/',bodyParser());

app.use("/api",(req,res, next) => {
    console.log(req.body);
    next();
});

app.post("/api/login",(req,res,next) => {
    i++;
    if (i > 3) { throw "System Error" }
    const {login, password} = req.body;
    if (login === 'test' && password === '123') {
        res.json({token : "secret"});
    }
});

app.get("/api/get_1",(req,res,next) => {
    if (req.query.token === 'secret') {
        res.json({ok:true});
    } else {
        res.status(404).json({errorMsg:"Page not found"}); 
    }
});

app.get("/api/get_2",(req,res, next) => {
    res.status(404).json({errorMsg:"Not authenticated"}); 
});

app.put("/api/arr",(req,res,next) => {
    if (req.query.token === 'secret') {
        arr.push(req.body);
        res.json({ok:true});
    } else {
        res.status(401).json({errorMsg:"Not authenticated"}); 
    }
});

app.get("/api/arr",(req,res,next) => {
    if (req.query.token === 'secret') {
        res.json(arr);
    } else {
        res.status(401).json({errorMsg:"Not authenticated"}); 
    }
});

// error handling
// app.use("/", function(err, req, res, next) {
//     res.status(404).json({"errorCode":-1,"errorMsg":err});
// });

// not found route
// app.use("/",(req,res) => {
//     res.status(404).json({"errorCode":-1,"errorMsg":"Route not found"});
// });


app.listen("8093");