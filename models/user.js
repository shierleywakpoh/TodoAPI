const db = require('../config/db');
const sql = 'CREATE TABLE user (name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL)';
db.query(sql, (error, results, fields) => {
        if (error) {
            console.error("Gagal mengecek tabel:", error);
            return; // Hentikan fungsi jika ada error database
        }
        console.log("connect");
});










/**
 * 
db.connect((err)=>{
    if (err){
        console.error('database connection failed:',err)
        return;
    }
    db.query('CREATE TABLE user (name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL)',(err,result)=>{
        if (err) throw err;
    })
    console.log('connected to mysql')
})
 */



/**
 * 
 * 
 */
