const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function viewEmp(callback) {
    db.query('SELECT * from employee', (err, employees) => {
        if (err) {
            console.error("Error getting results from Employee table: ", err.message);
            return;
        }
        console.table(employees);
        callback();
    })
}

module.exports = viewEmp;
