const express = require("express");
const path = require("path");
const dance = express();
const port = 8000;
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

//Define mongoose Schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

dance.use('/static', express.static('static'));
dance.use(express.urlencoded());

dance.set('view engine', 'pug'); // Set the template engine as pug
dance.set('views', path.join(__dirname, 'views'));

dance.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})

dance.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})
dance.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the databse")
    });
})
dance.listen(port, () => {
    console.log(`Application is running successfully on port ${port}`);
});