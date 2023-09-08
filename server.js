const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection.js');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB Connect

const db = mysql.createConnection({
    host:'127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

//App Start & Listen

app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
    //start the app
    require('./app/index.js');
})

module.exports ={db};

