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

/** -------- EXPRESS ROUTES -------- **/
app.use('/details', detailsRouter);

/** -------- START SERVER -------- **/
app.listen(PORT, () => {
    console.log(`listeningon port: `, PORT);
});