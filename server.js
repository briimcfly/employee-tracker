const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection.js');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host:'127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
    //start the app
    require('./app/index.js');
})

//Turn on connection to DB and Server

// sequelize.sync({force:true}).then(() => {
//     app.listen(PORT, () => {
//         console.log(`Now listening on http://localhost:${PORT}`);
//         //start the app 
//         require('./app/index.js');
//     });
// })

module.exports ={db};

