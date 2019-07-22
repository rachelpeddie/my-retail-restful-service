const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('mongoose');

// function to remove TM symbols -- ideally with more time, would account for all character codes and display these properly with the name of the product
function removeTM(title) {
  var titleArray = title.split("&#")
  return titleArray[0];
}

// get request to external redsky route to retrieve prodcut name and original pricing info
router.get('/name/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
    .then(response => {
      let name = removeTM(response.data.product.item.product_description.title);
      res.send(name);
    })
    .catch(error => {
      console.log(`error getting your product details`, error);
      res.sendStatus(500);
    })
})

// creating a mongoose schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
  productId: { type: Number, require: true },
  price: { type: Number, require: true },
  currencyCode: { type: String, default: 'USD', require: true },
});

// creating a mongoose model
const Product = mongoose.model('Product', productSchema);

// getting price from db for product by product id
router.get('/price/:id', (req, res) => {
  const id = req.params.id;
  Product.find({ productId: id }).sort('_id')
    .then(response => {
      res.send(response);
    }).catch(error => {
      console.log(`error getting price from mongodb`, error);
      res.sendStatus(500);
    })
})

// updating product price in db
router.put(`/price`, (req, res) => {
  const id = req.body.id;
  const newPrice = req.body.newPrice;
  Product.findOneAndUpdate({ productId: id }, { $set: { price: newPrice } })
    .then(response => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`error updating your product price in db`, error);
      res.sendStatus(500);
    })
})

module.exports = router;