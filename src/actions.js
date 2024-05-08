const inquirer = require('inquirer');
const pool = require('./db');
const queries = require('./queries');
const cTable = require('console.table');

// function to print all departments
const viewDepartments = async function () {
	const result = await pool.query(queries.viewDepartments);
	console.table(result.rows);
};

// function to print all roles
const viewRoles = async function () {
	const result = await pool.query(queries.viewRoles);
	console.table(result.rows);
};

// function to print all employees
const viewEmployees = async function () {
	const result = await pool.query(queries.viewEmployees);
	console.table(result.rows);
};

// function to add a department
const addDepartment = async function () {
	// prompt for department name
	const { deptName } = await inquirer.prompt({
		type: 'input',
		message: 'What is the name of the department?',
		name: 'deptName',
	});

	// query db to add department
	await pool.query(queries.addDepartment, [deptName]);

	console.log(`Added ${deptName} to the databse`);
};

// export each action function
module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	addDepartment,
}