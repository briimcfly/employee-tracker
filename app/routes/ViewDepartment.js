const {db} = require('../../server.js');
const inquirer = require('inquirer');

function viewDept(callback) {
    db.query('SELECT * from department', (err, departments) => {
        if (err) {
            console.error("Error getting results from Department table: ", err.message);
            return;
        }
        console.table(departments);
        callback();
    })

}

module.exports = viewDept;