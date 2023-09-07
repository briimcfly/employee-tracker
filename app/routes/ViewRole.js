const {db} = require('../../server.js');

function viewRole(callback) {
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
            console.error("Error getting results from Role table: ", err.message);
            return;
        }
        console.table(roles);
        callback();
    })

}

module.exports = viewRole;