const inquirer = require('inquirer');
const pool = require('./src/db');
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
		const response = await inquirer.prompt(questions)
	
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
			case 'Quit':
				hasSelectedQuit = true;
				break;
			default:
				console.log('Invalid action');
		}
	}

};

actionMenu();