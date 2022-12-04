var express = require('express');
var app = express();
var server = require('http').createServer(app);
var cors = require('cors');
var data = require('./data');
var processData = require('./processData');
const { match } = require('assert');
app.use(express.static(__dirname+'/node_modules'));
app.use(cors());
const ip = '0.0.0.0'

//This is the Get Api on which client will ping with current path to find next child.
app.get('/path', async function (req, res, next) {
    res.json(await processData.findChildData(data.getData(),0,req.query.mypath[0].split(",")));
});
    

server.listen(4000,ip);