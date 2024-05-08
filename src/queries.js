const viewDepartments = 'SELECT * FROM department';
const viewRoles = 'SELECT r.id, r.title, d.name AS department, r.salary FROM role r JOIN department d ON r.department = d.id';

module.exports = {
	viewDepartments,
	viewRoles,
}