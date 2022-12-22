const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// define schema
var dataSchema = mongoose.Schema({
    id : String,
    name : String
})

// create model with mongodb collection and schema
var Data = mongoose.model('datas', dataSchema);

// list
router.get('/list', function(req, res, next) {
    Data.find({},{'_id':0, '__v':0}).exec(function(err, docs) {
        if(err) console.log('err')
        res.writeHead(200);
        var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Result</title>
            <meta charset="utf-8">
        </head>
        <body>
            <table border="1" margin: auto; text-align : center;>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>update</th>
                <th>del</th>
            </tr>
            `;
            for(var i=0; i<docs.length; i++) {
                template += `

                <tr>
                    <form method='post' action='/update'>
                    <th><input type='text' size='5' value=${docs[i]['id']} name='id' readonly></th>
                    <th><input type='text' size='10' value=${docs[i]['name']} name='name'</th>
                    <th>
                    <button type="submit" name='upKey' value=${docs[i]['id']}>update</button>
                    </form>
                    </th>
                    <th>
                    <form method='post' action='/delete'>
                    <button type="submit" name='delKey' value=${docs[i]['id']}>del</button>
                    </form>
                    </th>
                </tr>
                `;
            }
            template += `
            </table>
        </body>
        </html>
        `;
        res.end(template)
    })
})

// insert
router.get('/insert', function(req, res, next) {
    var id = req.query.id;
    var name = req.query.name;
    var data = new Data({'id' : id, 'name' : name })
    
    data.save(function(err, silence) {
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
    var id = req.body.id;
    var name = req.body.name;

    Data.findOne({'id':id}, function(err, user) {
        if(err) {
            console.log('err')
            res.status(500).send('update error')
            return;
        }
        user.name = name;
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
    var id = req.body.delKey;
    console.log(id)
    Data.deleteOne({'id':id}, function(err, silence) {
        if (err) {
            console.log('err')
            res.status(500).send('delete error')
            return;            
        }
        res.status(200).send("Removed")
    })
})

module.exports = router;