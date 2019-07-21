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
let uri = 'mongodb://heroku_sr39k54r:94pe796ss7pf65ahmv0d78ue9h@ds161183.mlab.com:61183/heroku_sr39k54r';
const databaseUrl = 'mongodb://localhost:27017/myRetail-details';
// connect to mongo using mongoose
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(uri, { useNewUrlParser: true });
}
else {
  mongoose.connect(databaseUrl, { useNewUrlParser: true });
}
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
