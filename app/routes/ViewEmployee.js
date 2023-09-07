const {db} = require('../../server.js');

//View Employees Function 
function viewEmp(callback) {
    //Query Employee Table .. 
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
            //Error Handling 
            console.error("Error getting results from Employee table: ", err.message);
            return;
        }
        //Display Employee Table 
        console.table(employees);
        //Main Menu 
        callback();
    })
}

module.exports = viewEmp;
