const inquirer = require('inquirer');
const pool = require('./db');
const queries = require('./queries');

const viewDepartments = function () {
	pool.query(queries.viewDepartments, (err, result) => {
		if (err) {
			console.error(err);
		}
	});
};

module.exports = {
	viewDepartments,
}