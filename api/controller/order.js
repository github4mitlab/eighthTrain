const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/product');

exports.orders_get_all = (req, res) => {
    orderModel
      .find()
      .select("product quantity _id")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          order: docs.map(doc => {
            return {
              orderId: doc._id,
              productId: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          //ord_err: "주문정보조회에 문제가 생겼습니다."
          ord_err: err
        });
      });
  };

exports.orders_create_order = (req, res) => {
    productModel
      .findById(req.body.productId)
      .then(product => {
        if (!product) {
          return res.status(404).json({
            ord_err: "해당상품 정보를 찾지 못했습니다."
          });
        }
        const order = new orderModel({
          _id: mongoose.Types.ObjectId(),
          product: req.body.productId,
          quantity: req.body.quantity
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          prd_msg: "주문이 처리 되었습니다.",
          createdOrder: {
            _id: result._id,
            product: result.prodcut,
            quantity: result.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders"
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          // ord_err: err
          ord_err: "주문중에 알수 없는 문제가 발생하였습니다."
        });
      });
  };

exports.orders_get_order = (req, res) => {
    const id = req.params.orderId;
    orderModel
      .findById(id)
      .exec()
      .then(order => {
        if (!order) {
          return res.status(400).json({
            ord_err: "주문정보를 찾지 못했습니다."
          });
        }
  
        res.status(200).json({
          orderInfo: order,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + order.product
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          ord_err: "주문정보 조회에 문제가 발생하였습니다."
        });
      });
  };

exports.orders_delete_order = (req, res, next) => {
    orderModel
      .remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          ord_msg: "주문정보가 성공적으로 삭제되었습니다.",
          request: {
            type: "DELETE",
            url: "http://localhost:3000/orders",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          ord_err: "주문 취소에 문제가 생겼습니다."
        });
      });
  };

exports.orders_modify_order = (req, res) => {
    res.status(200).json({
      ord_msg: "PATCH / orders"
    });
  };
