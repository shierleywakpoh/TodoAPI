const express = require('express');
const app = express();
const cookieparser = require("cookie-parser")
//const item = require('./models/item')

//const db = require('./models/user');
const db = require('./config/db');

app.use(express.json());
app.use(cookieparser());

const regis = require('./routes/login');
app.use('/api',regis);

const todo = require('./routes/ToDo');
const cookieParser = require('cookie-parser');
app.use('/api',todo);

//const cond = require('./routes/condition');
//app.use('/api',cond);

app.get('/',(req,res)=>{
    res.send('running...')
})



module.exports = app;



/**
 * 
const mysql = require('mysql');
const conct = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password :'12345',
    database : 'todo_API'
})

conct.connect(function(err){
    if (err) throw err;
    console.log('database connect')
    
})
 * 
 */