{"filter":false,"title":"app.js","tooltip":"/node/datetime/app.js","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":5,"column":0},"action":"remove","lines":["","let today = new Date().toLocaleDateString('sv').replaceAll('-','');","","console.log()","console.log(today)",""],"id":38},{"start":{"row":0,"column":0},"end":{"row":27,"column":3},"action":"insert","lines":["const express = require('express');","const morgan = require('morgan');","const path = require('path');","const app = express();","const bodyParser = require('body-parser');","const cookieParser = require('cookie-parser');","const router = express.Router();","","// view engine setup","app.set('port', process.env.PORT || 3000)","","app.use(morgan('dev'));","app.use(bodyParser.json());","app.use(bodyParser.urlencoded({ extended: false }));","app.use(cookieParser());","app.use(express.static(path.join(__dirname, 'views')));","","//mongoose configuration","const mongoose = require(\"mongoose\")","mongoose.connect('mongodb://43.201.94.25:27017/mydb')","","// routes setup","var main = require('./routes/main.js');","app.use('/', main);","","app.listen(app.get('port'), () =>{","\tconsole.log('3000 Port : 서버 실행 중')","});"]}],[{"start":{"row":17,"column":0},"end":{"row":20,"column":0},"action":"remove","lines":["//mongoose configuration","const mongoose = require(\"mongoose\")","mongoose.connect('mongodb://43.201.94.25:27017/mydb')",""],"id":39},{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"remove","lines":["",""]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":23,"column":3},"end":{"row":23,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1670888822275,"hash":"096148f16e34a1bc03bbc52d19a7497a91076064"}