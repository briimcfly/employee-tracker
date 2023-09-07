const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function viewEmp(callback) {
    db.query(`
    SELECT
        employee.id,
        CONCAT(employee.first_name, " ", employee.last_name) AS employee_name,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name,
        role.title AS role_name
    FROM 
        employee
    LEFT JOIN 
        employee AS manager ON employee.manager_id = manager.id
    LEFT JOIN
        role ON employee.role_id = role.id
    `, (err, employees) => {
        if (err) {
            console.error("Error getting results from Employee table: ", err.message);
            return;
        }
        console.table(employees);
        callback();
    })
}

module.exports = viewEmp;
