const express = require('express');
const app = express();
const morgan = require("morgan");
const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true})); // extract url encoded data easily
app.use(bodyParser.json()); // extract json data easily

// this is to prevent the cors error cross origin resource sharing
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){// answer for the HTTP verb which are allowed in your web api
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET"); 
        return res.status(200).json({});
    }
    next(); // without this the request will be block.. calling callback is import
});

app.use("/products",productRoutes);
app.use("/orders",ordersRoutes);

//connecting to mongoDB
mongoose.connect('mongodb+srv://admin:'+process.env.MONGO_PASSWORD+'@node-rest-api-tispt.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(db=>console.log("successfully connected to the database"))
.catch(err=>console.log(err));


// use is the express middlewear every req need to get pass through all of this and there comes a next parameter in which 
// continues the middlewear execution by passing it to the next middlewear.Next is  kinda like callback function
app.use((req, res, next)=>{
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{


    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
    // above request will reach here by with new args error 
});




module.exports = app; 