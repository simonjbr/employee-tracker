const inquirer = require('inquirer');
const actions = require('./src/actions');

// function for inquirer prompt
const actionMenu = async function () {
	
	// create question(s) for inquirer prompt
	const questions = [
		{
			type: 'list',
			message: 'What would you like to do?',
			name: 'action',
			choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
		}
	];
	
	// boolean to break while loop once user has selected quit
	let hasSelectedQuit = false;
	
	// loop to allow user to perform multiple actions
	while(!hasSelectedQuit) {
		// prompt user with action menu
		const response = await inquirer.prompt(questions)
	
		// switch case to deal with all user responses
		switch (response.action) {
			case 'View All Departments':
				await actions.viewDepartments();
				break;
			case 'View All Roles':
				await actions.viewRoles();
				break;
			case 'View All Employees':
				await actions.viewEmployees();
				break;
			case 'Add Department':
				await actions.addDepartment();
				break;
			case 'Add Role':
				await actions.addRole();
				break;
			case 'Add Employee':
				await actions.addEmployee();
				break;
			case 'Update Employee Role':
				await actions.updateEmployeeRole();
				break;
			case 'Quit':
				hasSelectedQuit = true;
				break;
			default:
				console.log('Invalid action');
				break;
		}
	}

};

actionMenu();