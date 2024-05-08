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

	// query db for current employees
	const managers = await pool.query(queries.getEmployees);

	// loop through query results to create array of employees for inquirer prompt manager choices
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
			const employeeManagerIdResults = await pool.query(queries.getEmployeeId, [employeeManagerName]);
			employeeManagerId = employeeManagerIdResults.rows[0].id;
		}

		// query to insert new employee
		await pool.query(queries.addEmployee, [firstName, lastName, employeeRoleId, employeeManagerId]);

		console.log(`Added ${firstName} ${lastName} to the database`);
};

// function to update employee role
const updateEmployeeRole = async function () {
	// query db for current employees
	const employees = await pool.query(queries.getEmployees);

	// loop through query results to create array of employees for inquirer prompt employeeName choices
	const employeeArr = [];
	for (const employee of employees.rows) {
		employeeArr.push(employee.name);
	}

	// query db for current roles
	const roles = await pool.query(queries.viewRoles);

	// loop through query results to create array of roles for inquirer prompt role choices
	const roleArr = [];
	for (const role of roles.rows) {
		roleArr.push(role.title);
	}

	// prompt user for role update information
	const { employeeName, roleName } = await inquirer
		.prompt([
			{
				type: 'list',
				message: "Which employee's role do you want to update?",
				name: 'employeeName',
				choices: employeeArr,
			},
			{
				type: 'list',
				message: "To which role do you want to assign the selected employee?",
				name: 'roleName',
				choices: roleArr,
			},
		]);

	// get employee.id from employeeName
	const employeeIdResults = await pool.query(queries.getEmployeeId, [employeeName]);
	employeeId = employeeIdResults.rows[0].id;

	// get role.id from roleName
	const roleIdResults = await pool.query(queries.getRoleId, [roleName]);
	const roleId = roleIdResults.rows[0].id;

	// console.log(employeeName, employeeId, roleName, roleId);

	await pool.query(queries.updateEmployeeRole, [roleId, employeeId]);

	console.log(`Updated ${employeeName}'s role`);


};

// export each action function
module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	addDepartment,
	addRole,
	addEmployee,
	updateEmployeeRole,
}