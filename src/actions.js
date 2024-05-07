const inquirer = require('inquirer');
const pool = require('./db');
const queries = require('./queries');
const cTable = require('console.table');

// function to print all departments
const viewDepartments = async function () {
	const result = await pool.query(queries.viewDepartments);
	console.table(result.rows);
};

// export each action function
module.exports = {
	viewDepartments,
}