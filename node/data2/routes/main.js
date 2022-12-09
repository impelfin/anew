const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const request = require("request")
const moment = require("moment")
const dateutil = require("data-utils")
const mongoClient = require("mongodb").MongoClient

let day = new Date().toLocaleDateString('sv').replaceAll('-','');

var keys = "B%2FNiJnYmkZV1%2FK7ulvZI4MoSXvCTDfNAd0Snw%2Bk6g4%2BbMk1LoGVhd75DJahjv4K35Cr9jh9RX0j%2BM89grKBYsw%3D%3D";
var url = "http://apis.data.go.kr/1360000/WthrChartInfoService/getSurfaceChart";

var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + keys;
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
queryParams += '&' + encodeURIComponent('code') + '=' + encodeURIComponent('3');
queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent(day);

// define schema
var DataSchema = mongoose.Schema({
    day : String,
    manfile : String
})

// create model with mongodb collection and schema
var Data = mongoose.model('weather', DataSchema);

// getdata
router.get('/getdata', function(req, res, next) {
    request({
            url : url + queryParams,
            method : "GET"
    }, function (error, response, body) {
//        Data.find({}).remove().exec();
//       if (error) console.log(error)
//        console.log('resultCode', response.resultCode);
//        console.log('Headers', JSON.stringify(response.headers));
        var data = JSON.parse(body)
        var result = data['response']['body']['items']['item'][0]['man-file']
        var url = ""
        for (var i=1; i<((result.length) / 2)-1; i++) url = url.concat(result[i])
        console.log(url)
        res.writeHead(200);
        var template = `
         <!doctype html>
         <html>
         <head>
          <title>Result</title>
          <meta charset="utf-8">
         </head>
         <body>
            <img src=${url} width="500" height="500" ></img>
         </body>
         </html>
        `;
        res.end(template);
    })
})

module.exports = router;