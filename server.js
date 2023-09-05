const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection.js');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Turn on connection to DB and Server
sequelize.sync({force:true}).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening on http://localhost:${PORT}`);
        //start the app 
        require('./app/index.js');
    });
})

