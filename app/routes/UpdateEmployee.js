const {db} = require('../../server.js');
const inquirer = require('inquirer');

//Update Employee Function 
function updateEmp(callback){
    //Query DB for Employee Choices w/ Role 
    db.query(`
    SELECT
        CONCAT(first_name," ",last_name) AS employee_name,
        role.title as role_name,
        employee.id AS employee_id
    FROM 
        employee JOIN role ON employee.role_id = role.id
    `, (err, employees) => {
        if(err) {
            //error handling 
            console.log(err);
        }
        //Employee List 
        const employeeChoices = employees.map(employee => ({
            name: `${employee.employee_name} || ${employee.role_name} `,
            value: employee.employee_id
        }));

        //Prompt User for Employee 
        inquirer.prompt([
            {
                //Ask user to Select an Employee
                type:'list',
                message:'SELECT AN EMPLOYEE',
                name:'emp_name',
                choices: employeeChoices
            }
        ]).then(response => {
            const selectedEmpId = response.emp_name;

            //Query for New Roles 
            db.query(`
            SELECT
                id,
                title
            FROM
                role
            `, (err, roles) => {
                //Error Handling 
                if(err) {
                    console.log(err);
                }

                //New Role Choices 
                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }));

                //Prompt User to Select new Role 
                inquirer.prompt([
                    {
                        type:'list',
                        message:'SELECT A NEW ROLE FOR THIS EMPLOYEE',
                        name:'new_role',
                        choices:roleChoices
                    }
                ]).then((newRoleResponse) => {
                    const newRole = newRoleResponse.new_role;
                    //Update the Employee Query 
                    db.query(`
                    UPDATE 
                        employee 
                    SET 
                        role_id = ?
                    WHERE
                        id = ?
                    `, [newRole, selectedEmpId],
                    (err) => {
                        //Error Handling 
                        if (err) {
                            console.log(err)
                        }else {
                            //Query for Employee Table 
                            db.query('SELECT * from employee', (err, employees) => {
                                if (err) {
                                    console.error("Error getting results from Employee table: ", err.message);
                                    return;
                                }
                                //Success Message
                                console.log("Succesfully Updated")
                                //Display the Employee Table 
                                console.table(employees); 

                                //Prompt user if they want to update another 
                                inquirer.prompt([
                                    {
                                        name: 'continue',
                                        type: 'confirm',
                                        message: 'WOULD YOU LIKE TO UPDATE ANOTHER EMPLOYEE ROLE?'
                                    }
                                ]).then((continueResponse) => {
                                    //Add Another 
                                    if (continueResponse.continue) {
                                        updateEmp(callback);
                                    } else {
                                        //Main Menu 
                                        callback(); 
                                    }
                                    });
                            })
                                
                        }
                    })
                })
            })
        })
    })
}

module.exports = updateEmp;