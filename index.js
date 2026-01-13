const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const campground = require('./models/campground');

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// Campground index
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

// New Campground routes
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${ newCampground._id }`);
});

// Campground show route
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
});

// Edit campground routes
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${ campground._id }`);
});

app.listen(serverPort, () => {
    console.log(`SERVING ON PORT ${ serverPort }`);
});