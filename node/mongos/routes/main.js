const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// define schema
var userSchema = mongoose.Schema({
    userid : String,
    name : String,
    city : String,
    sex : String,
    age : Number
})

// create model with mongodb collection and schema
var User = mongoose.model('users', userSchema);

// list
router.get('/list', function(req, res, next) {
    User.find({}, function(err, docs) {
        if(err) console.log('err')
        res.send(docs)
    })
})

// get
router.get('/get', function(req, res, next) {
    var userid = req.query.input
    User.findOne({'userid': userid}, function(err,doc) {
        if(err) console.log('err')
        res.send(doc)
    })
})


// insert
router.post('/insert', function(req, res, next) {
    var userid = req.body.userid;
    var name = req.body.name;
    var city = req.body.city
    var sex = req.body.sex;
    var age = req.body.age;
    var user = new User({'userid' : userid, 'name' : name, 'city': city, 'sex' : sex, 'age' : age })
    
    user.save(function(err, silence) {
        if(err) {
            console.log('err')
            res.status(500).send('update error')
            return;
        }
        res.status(200).send("Inserted")
    })
})

// update
router.post('/update', function(req, res, next) {
    var userid = req.body.userid;
    var name = req.body.name;
    var city = req.body.city
    var sex = req.body.sex;
    var age = req.body.age;
    
    User.findOne({'userid':userid}, function(err, user) {
        if(err) {
            console.log('err')
            res.status(500).send('update error')
            return;
        }
        user.name = name;
        user.sex = sex;
        user.city = city;
        user.age = age;
        user.save(function(err, silence) {
            if(err) {
                console.log('err')
                res.status(500).send('update error')
                return;
            }
            res.status(200).send("Updated")
        })
    })
})

// delete
router.post('/delete', function(req, res, next) {
    var userid = req.body.userid;
    var user = User.find({'userid' : userid})
    user.remove(function(err) {
        if (err) {
            console.log('err')
            res.status(500).send('delete error')
            return;            
        }
        res.status(200).send("Removed")
    })
})

module.exports = router;