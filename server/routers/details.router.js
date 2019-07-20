const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool.js');
const mongoose = require('mongoose');

// get request to external redsky route to retrieve prodcut name and original pricing info
router.get('/name/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
    .then(response => {
      let name = response.data.product.item.product_description.title;
      console.log(`response name are`, name);
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


router.get( '/price/:id', (req, res) => {
  const id = req.params.id;
  Product.find({productId: id}).sort('_id')
  .then( response => {
    let price = response.data;
    console.log(`response price is`, price);
    res.send(price);    
  }).catch( error => {
    console.log(`error getting price from mongodb`, error);
    res.sendStatus(500);
  })
})

module.exports = router;