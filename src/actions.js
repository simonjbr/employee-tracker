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

// function to add a role
const addRole = async function () {
	// query db for current departments
	const departments = await pool.query(queries.viewDepartments);
	// console.log(departments.rows);

	// loop through query results to create array of departments for inquirer prompt choices
	const deptArr = [];
	for (const dept of departments.rows) {
		deptArr.push(dept.name);
	}

	// prompt user for new role information
	const { roleName, roleSalary, roleDeptName } = await inquirer
		.prompt([
			{
				type: 'input',
				message: 'What is the name of the role?',
				name: 'roleName',
			},
			{
				type: 'input',
				message: 'What is the salary of the role?',
				name: 'roleSalary',
			},
			{
				type: 'list',
				message: 'What department does the role belong to?',
				name: 'roleDeptName',
				choices: deptArr,
			},
		]);

	// get department.id from roleDeptName
	const roleDeptIdResults = await pool.query(queries.getDeptId, [roleDeptName]);
	const roleDeptId = roleDeptIdResults.rows[0].id;

	await pool.query(queries.addRole, [roleName, roleSalary, roleDeptId]);
	console.log(`Added ${roleName} to the database`);
};

// export each action function
module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	addDepartment,
	addRole,
}