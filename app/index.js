const {readFile, writeFile} = require('fs');
const inquirer = require('inquirer');

inquirer
.prompt([
    {
        type: 'input',
        message: 'this is a test input',
        name: 'test_input'
    }
])