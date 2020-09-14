const express = require('express');
const app = express();
const monsters = require('./routes/monsters')
const habitats = require('./routes/habitats')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({
    origin: '*',
    methods: ['GET','POST', 'PUT','PATCH', 'DELETE' ]
}));


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(bodyParser.json());
app.use('/monsters', monsters);
app.use('/habitats', habitats);
app.use((err, req, res, next) => {
    res.json(err)
    next();
});


module.exports = app