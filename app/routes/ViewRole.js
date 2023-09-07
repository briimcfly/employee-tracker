const {db} = require('../../server.js');

//View Roles Function 
function viewRole(callback) {
    //Query Role Table 
    db.query(`
    SELECT
        role.id, role.title, role.salary, department.name AS department_name
    FROM
        role
    LEFT JOIN 
        department
    ON
        role.department_id = department.id
    `, (err, roles) => {
        if (err) {
            //Error Handling 
            console.error("Error getting results from Role table: ", err.message);
            return;
        }
        //Display Role Tables 
        console.table(roles);
        //Main Menu
        callback();
    })

}

module.exports = viewRole;