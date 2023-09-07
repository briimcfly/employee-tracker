const {db} = require('../../server.js');
const inquirer = require('inquirer');

//Add Department Function
function addDept(callback){
    //Prompt User for Department Name
    inquirer.prompt([
        {
            type:'input',
            message:'ENTER DEPARTMENT NAME',
            name:'dept_name'
        }
    ])
    //Response
    .then(response => {
        const deptName = response.dept_name;

        //Insert into DB
        db.query(`
        INSERT INTO
            department (name)
        VALUES
            (?)
        `,[deptName],
        (err) => {
        //Error Handling
            if(err){
                console.log(err);
            }

            //Select all Departments
            db.query(`SELECT * FROM department`, (err, departments) => {
                if(err){
                    console.log(err);
                }
                //Success Message
                console.log(`${deptName} succesfully added! \n`);
                //Display the Departments 
                console.table(departments);
                
                //Prompt User if they'd to add another
                inquirer.prompt([
                    {
                        name: 'continue',
                        type: 'confirm',
                        message: 'WOULD YOU LIKE TO ADD ANOTHER DEPARTMENT?'
                    }
                ]).then((continueResponse) => {
                    //If they Want Another, Run Again
                    if (continueResponse.continue) {
                        addDept(callback);
                    } else {
                        //If not, go back to Main Menu
                        callback(); 
                    }
                });
            })
        }
        )
    })
}

module.exports = addDept;