const express = require('express');
const app = express();
const morgan = require("morgan");
const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

app.use(morgan("dev"));


app.use("/products",productRoutes);
app.use("/orders",ordersRoutes);

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