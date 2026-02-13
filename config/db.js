const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE

})


/**
 db.connect((err)=>{
     if (err){
         console.error('database connection failed:',err)
         return;
     }
     console.log('connected to mysql')
 })
 * 
 * 
 */
module.exports = db;