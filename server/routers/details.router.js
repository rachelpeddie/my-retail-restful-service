const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const mongoose = require('mongoose');

// connect to mongo using mongoose
const databaseUrl = 'mongodb://localhost:27017/customRedskyPricing';
congoose.connect(databseUrl, { useNewUrlParser: true });

// log when connected
mongoose.connection.once('connected', () => {
    console.log(`mongoose connected to db: `, databaseUrl);  
});

// log if error
mongoose.connection.on('error', () => {
    console.log(`error connecting mongoose to db: `, error);
});

// creating a mongoose schema
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productId: { type: Number, require: true },
    productName: { type: String, require: true },
    price: { type: Number, require: false }
});

// creating a mongoose model
const Product = mongoose.model('Product', productSchema);