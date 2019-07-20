const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const detailsRouter = require('./routers/details.router.js');


/** -------- MIDDLEWARE -------- **/
app.use(bodyParser.json());
// set up for future deployment on Heroku
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}
else {
  app.use(express.static('public'));
}
/** --------- DATABASE -------- **/

const mongoose = require('mongoose');

// connect to mongo using mongoose
const databaseUrl = 'mongodb://localhost:27017/myRetail-details';
mongoose.connect(databaseUrl, { useNewUrlParser: true });

// log when connected
mongoose.connection.once('connected', () => {
  console.log(`mongoose connected to db: `, databaseUrl);
});

// log if error
mongoose.connection.on('error', () => {
  console.log(`error connecting mongoose to db: `, error);
});

/** -------- EXPRESS ROUTES -------- **/
app.use('/details', detailsRouter);

/** -------- START SERVER -------- **/
app.listen(PORT, () => {
  console.log(`listening on port: `, PORT);
});
