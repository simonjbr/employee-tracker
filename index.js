const inquirer = require('inquirer');
const pool = require('./db/db');

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
	while (!hasSelectedQuit) {
		const response = await inquirer.prompt(questions)
		
		console.log(response.action);
		if (response.action === 'Quit') {
			hasSelectedQuit = true;
			continue;
		}

		
	}
};

actionMenu();