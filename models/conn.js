var mysql = require("mysql");

var conn =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'deepti'

});

conn.connect(function(err){
    if(err)throw err;
    console.log('connection done')
})

module.exports = conn;