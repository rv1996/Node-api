const express = require("express");
const router = express.Router();

router.get("/",(req, res, next)=>{
    res.status(200).json({
        message:"Handling Get request for orders"
    })
});


router.post("/",(req, res, next)=>{

    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"Order was created",
        order:order
    })
});

router.get("/:orderId",(req, res, next)=>{
    const id = req.params.orderId;

    res.status(200).json({
        message:"Testing for id routes"+id+" product"
    })
})

router.patch("/:orderId",(req, res, next)=>{
    const id = req.params.orderId

    res.status(200).json({
        message:"Testing for id routes"+id+" product route for updating the product"
    })
})

router.delete("/:orderId",(req, res, next)=>{
    const id = req.params.orderId

    res.status(200).json({
        message:"order to delete"
    })
})

module.exports = router;