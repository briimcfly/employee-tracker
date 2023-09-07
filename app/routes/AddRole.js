const {db} = require('../../server.js');
const inquirer = require('inquirer');

//Add Role Function
function addRole(callback) {
    //Get Departments from Department Table 
    db.query('SELECT id, name FROM department', (err, departments) => {
        if (err) {
            console.error("Error getting results from department table: ", err.message);
            return;
        }
        
        //Department Choice List 
        const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));
    
        inquirer.prompt([
        {
            //Ask user for the name
            type: 'input',
            message: 'ENTER THE ROLE NAME',
            name: 'role_name',
        },
        {
            //Ask user for the salary
            type: 'input',
            message: 'ENTER THE ROLE SALARY',
            name: 'role_salary',
        },
        {
            //Have user select a department 
            type: 'list',
            message: 'ENTER THE ROLE DEPARTMENT',
            name: 'role_dept',
            choices: departmentChoices
        }
    ])
    .then((response)=> {
        const {role_name, role_salary, role_dept } = response;
        
        return new Promise((resolve, reject) => {
            //Write to DB 
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
            [role_name, role_salary, role_dept],
             (err)=>{
                //Error Handling 
                if (err) {
                    reject(err);
                    return;
                }
                
                //Query for Table Display
                db.query(`
                SELECT
                    role.id, 
                    role.title, 
                    role.salary, 
                    department.name as department_name FROM role JOIN department ON role.department_id = department.id
                ORDER BY 
                    role.id 
                DESC
                `,(err,roles) => {
                    //Error Handling 
                    if(err) {
                        reject(err);
                        return;
                    }
                    //Success Message
                    console.log(`${role_name} succesfully added! \n`);
                    //Display Role Table 
                    console.table(roles);
        
                    //Prompt User if they want to Create another Role 
                    inquirer.prompt([
                        {
                            name: 'continue',
                            type: 'confirm',
                            message: 'WOULD YOU LIKE TO ADD ANOTHER ROLE?'
                        }
                    ]).then((continueResponse) => {
                        //Create Another 
                        if (continueResponse.continue) {
                            addRole(callback);
                        } else {
                            //Go to Main Menu 
                            callback(); 
                        }
                        });
                        resolve();
                    });
                });
            });
        });
    });
}

module.exports = addRole;






