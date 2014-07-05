var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

var app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/geolookup', function (req, res) {
    var query = req.body.location;

    request.get(
        'http://nominatim.openstreetmap.org/search?format=json&limit=1&q='+query
    ).pipe(res);
});


var PORT = process.env.PORT || 3000;
app.listen(PORT);
