const express = require('express');
const router = express.Router() ;

const mongoose = require('mongoose');
const productModel = require('../models/product');

// Get All productInfo from DB
router.get('/', (req, res, next) => {
    productModel
      .find()
      .exec()
      .then( docs =>{
        const response = {
            count: docs.length,
            products: docs.map( doc => {
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: "GET", 
                        url: "http://localhost:3000/products/" + doc._id
                    }
                };
            })
        }
        res.status(200).json(response);
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({
          product_err: err
        });
      });
  });

// Get Product Info through productId
router.get('/:productId', (req,res) => {
    const id = req.params.productId;
    productModel.findById(id)
        .exec()
        .then( doc => {
            console.log("Quering DB...", doc);
            if (doc) {
                res.status(200).json({
                    product_Info: doc,
                    request:{
                        type: "GET",
                        url: "http://localhost:3000/products/" + id
                    }
                });
            } else {
                res.status(400).json({
                    prd_msg: "해당정보 없음"
                });
            }
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                prd_err: err
            });
        });
});

// POST Product Info to DB
router.post('/', (req,res) =>{
    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then( result => {
            console.log(result);
            res.status(200).json({
                prd_msg: "상품정보가 업데이트되었습니다.",
                createProduct: result,
                request: {
                    type: "POST",
                    url: "http://localhost:3000/products/"
                }

            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                prd_err: err
            });
        });
});



// patch
router.patch('/', (req,res) => {
    res.status(200).json({
        prd_msg:"PATCH / products"
    });
});

// Delete Product Info by productId
router.delete('/:productId', (req,res) => {
    const id = req.params.productId;
    productModel
        .remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                prd_msg:"삭제 성공", 
                "삭제상품아이디": id,
                request: {
                    type: "DELETE",
                    url: "http://localhost:3000/products",
                    body: { name: 'String', price: 'Number'}

                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                prd_err: "삭제중 오류발생"
                // prd_err: err
            });
        });
});

module.exports = router;