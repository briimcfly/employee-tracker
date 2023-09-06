const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function viewRole(callback) {
    db.query('SELECT * from role', (err, roles) => {
        if (err) {
            console.error("Error getting results from Role table: ", err.message);
            return;
        }
        console.table(roles);
        callback();
    })

}

module.exports = viewRole;