const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const serverPort = 3000;
const dbPort = 27017;
const dbName = 'yelpCamp';

mongoose.connect(`mongodb://localhost:${ dbPort }/${ dbName }`)
.then(() => {
    console.log(`MONGODB CONNECTED TO ${ dbName } ON PORT ${ dbPort }`);
})
.catch(err => {
    console.log(err);
});

const db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(serverPort, () => {
    console.log(`SERVING ON PORT ${ serverPort }`);
});