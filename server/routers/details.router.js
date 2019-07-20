const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool.js');
const mongoose = require('mongoose');

// get request to external redsky route to retrieve prodcut name and original pricing info
router.get('/', (req, res) => {
  const id = req.body;
  const details = {};
  axios.get(`https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
    .then(response => {
      console.log(`successfully retrieved your product details`, response.data);
      // details = {
      //     id:
      //     name:
      //     ogPrice: response.data.
      // }
      // res.send(response.data);
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
  price: { type: Number, require: false },
  currencyCode: { type: String, require: true },
});

// creating a mongoose model
const Product = mongoose.model('Product', productSchema);

module.exports = router;