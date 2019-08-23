const express = require("express");
const Product = require("../models/products");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/",(req, res, next)=>{
    
    Product.find().exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            data:doc
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(501).json({
            error:err
        })
    })
    
});


router.post("/",(req, res, next)=>{

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Product is created",
            createdProduct: result
        });

    }).catch(err=>{
        console.log(err)
        res.status(501).json({
            message:"Error Occured while writing to database",
            error: err
        })
    });

    
});

router.get("/:prodId",(req, res, next)=>{
    const id = req.params.prodId

    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(501).json({
            error:err
        });
    });
});

router.patch("/:prodId",(req, res, next)=>{
    const id = req.params.prodId

    res.status(200).json({
        message:"Testing for id routes"+id+" product route for updating the product"
    })
})

router.delete("/:prodId",(req, res, next)=>{
    const id = req.params.prodId

    Product.deleteOne({_id:id}).exec()
    .then(result=>{
        if(result.n > 0){
            res.status(200).json({
                message:"Product deleted",
                result:result
            });
        }else{
            res.status(404).json({
                message:"Could not find the product"
            });
        }
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
    
})

module.exports = router;