const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

module.exports = updateEmp;