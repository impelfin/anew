const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const request = require("request")
const moment = require("moment")
const dateutil = require("data-utils")
const mongoClient = require("mongodb").MongoClient
const env = require("dotenv").config({ path: "../../../.env"});

let today = new Date().toLocaleDateString('sv').replaceAll('-','');

var keys = process.env.Keys;
var url = process.env.Url;

var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + keys;
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('apiType') + '=' + encodeURIComponent('XML');
queryParams += '&' + encodeURIComponent('status_dt') + '=' + encodeURIComponent(today);

// define schema
var coronaSchema = mongoose.Schema({
    code : String,
    totalCount : Number,
    hPntCnt : Number,
    statusDt : String,
    statusTime : String
})

// create model with mongodb collection and schema
var corona = mongoose.model('corona', coronaSchema);

// getdata
router.get('/getdata', function(req, res, next) {
    request({
            url : url + queryParams,
            method : "GET"
    }, function (error, response, body) {
        corona.find({}).remove().exec();
        console.log('resultCode', response.resultCode);
        console.log('Headers', JSON.stringify(response.headers));
        //console.log(body)

    })
})

module.exports = router;