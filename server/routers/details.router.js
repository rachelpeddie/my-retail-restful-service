const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const mongoose = require('mongoose');

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