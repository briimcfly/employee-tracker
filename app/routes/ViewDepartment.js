const {db} = require('../../server.js');

//View Department Function 
function viewDept(callback) {
    //Query Department Table
    db.query('SELECT * from department', (err, departments) => {
        if (err) {
            //Error Handling
            console.error("Error getting results from Department table: ", err.message);
            return;
        }
        //Display Department Table
        console.table(departments);
        //Main Menu
        callback();
    })

}

module.exports = viewDept;