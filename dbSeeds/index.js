const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

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

const titleSample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        // The cities array has 1000 cities
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const newCampground = new Campground({
            title: `${ titleSample(descriptors) } ${ titleSample(places) }`,
            location: `${ cities[random1000].city }, ${ cities[random1000].state }`,
            image: 'https://picsum.photos/400',
            price: price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa quod cum exercitationem. Voluptatem, ad voluptatum ratione deleniti reiciendis obcaecati molestias, cumque odit asperiores debitis minima hic doloremque ea est.'
        });

        await newCampground.save();
    }
};

seedDB().then(() => {
    db.close();
});