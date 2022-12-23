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
            <style>
                table {
                    border-collapse: collapse;
                    border: 1px solid #aaa;
                }
                thead th,
                thead td {
                    background-color: #bbdefb;
                }
                th,
                td {
                  border: 1px solid #aaa;
                  background-clip: padding-box;
                }
                #input1 {
                    width : 50px;
                    height : 10px;
                    border : none;
                }
                #input2 {
                    width : 120px;
                    height : 10px;
                    border : none;
                }
                button {
                  background-color: #e7e7e7;
                  color: black;
                  border: 1px solid #aaa;
                  padding : 2px 5px;
                }
            </style>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>update</th>
                        <th>del</th>
                    </tr>
                </thead>
            `;
            for(var i=0; i<docs.length; i++) {
                template += `
                <tbody>
                    <tr>
                        <form method='post' action='/update'>
                        <th><input type='text' id="input1" size='5' value=${docs[i]['id']} name='id' readonly></th>
                        <th><input type='text' id="input2" size='10' value=${docs[i]['name']} name='name'</th>
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
                </tbody>
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