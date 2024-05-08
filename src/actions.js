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

	// query to insert new role
	await pool.query(queries.addRole, [roleName, roleSalary, roleDeptId]);
	console.log(`Added ${roleName} to the database`);
};

// function to add employee
const addEmployee = async function () {
	// query db for current roles
	const roles = await pool.query(queries.viewRoles);

	// loop through query results to create array of departments for inquirer prompt choices
	const roleArr = [];
	for (const role of roles.rows) {
		roleArr.push(role.title);
	}

	// query db for current managers
	const managers = await pool.query(queries.getManagers);

	// loop through query results to create array of managers for inquirer prompt choices
	const managerArr = ['None'];
	for (const manager of managers.rows) {
		managerArr.push(manager.name);
	}

	// prompt user for new employee information
	const { firstName, lastName, employeeRoleName, employeeManagerName } = await inquirer
		.prompt([
			{
				type: 'input',
				message: "What is the employee's first name?",
				name: 'firstName',
			},
			{
				type: 'input',
				message: "What is the employee's last name?",
				name: 'lastName',
			},
			{
				type: 'list',
				message: "What is the employee's role?",
				name: 'employeeRoleName',
				choices: roleArr,
			},
			{
				type: 'list',
				message: "Who is the employee's manager?",
				name: 'employeeManagerName',
				choices: managerArr,
			},
		]);

		// get role.id from employeeRole
		const employeeRoleIdResults = await pool.query(queries.getRoleId, [employeeRoleName]);
		const employeeRoleId = employeeRoleIdResults.rows[0].id;

		// get manager's employee.id from employeeManagerName
		let employeeManagerId;
		if (employeeManagerName !== 'None') {
			const employeeManagerIdResults = await pool .query(queries.getManagerId, [employeeManagerName]);
			employeeManagerId = employeeManagerIdResults.rows[0].id;
		}

		// query to insert new employee
		await pool.query(queries.addEmployee, [firstName, lastName, employeeRoleId, employeeManagerId]);

		console.log(`Added ${firstName} ${lastName} to the database`);
};

// export each action function
module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	addDepartment,
	addRole,
	addEmployee,
}