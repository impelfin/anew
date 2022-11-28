var mysql = require("sync-mysql");

var connection = new mysql({
	host : "43.201.94.25",
    	port : "3306",
	user : "mysql",
	password : "1234",
	database : "st_db",
});

// Select all rows from st_info table
let result = connection.query("SELECT * FROM st_info");
console.log(result);
