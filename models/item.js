const db = require('../config/db');

sql = 'CREATE TABLE item (id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255),description VARCHAR(255))';
db.query(sql,(err,result)=>{
    if(err) return console.error('cant add table ',err);
    console.log('connect')
})