const express = require("express");
const router = express.Router();

router.get("/",(req, res, next)=>{
    res.status(200).json({
        message:"Handling Get request for products"
    })
});


router.post("/",(req, res, next)=>{
    res.status(200).json({
        message:"Handling post request for products"
    })
});

router.get("/:prodId",(req, res, next)=>{
    const id = req.params.prodId

    res.status(200).json({
        message:"Testing for id routes"+id+" product"
    })
})

router.patch("/:prodId",(req, res, next)=>{
    const id = req.params.prodId

    res.status(200).json({
        message:"Testing for id routes"+id+" product route for updating the product"
    })
})

router.delete("/:prodId",(req, res, next)=>{
    const id = req.params.prodId

    res.status(200).json({
        message:"route to delete"
    })
})

module.exports = router;