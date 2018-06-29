var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var  router = express.Router()

var itemsController = require('./routes/items-list');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var csvFilePath = __dirname+'/Fashion.csv'

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

console.log('csv'+csvFilePath)
// Define Routes
app.use('/api', router);

router.route('/lists')
	.get(itemsController.convertCSVtoJSON(csvFilePath))

router.route('/getlists')
	.get(itemsController.sendList())

app.listen(5000);
console.log('Server started on port 5000');
