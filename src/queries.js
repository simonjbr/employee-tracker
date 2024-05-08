const viewDepartments = "SELECT * FROM department";
const viewRoles = "SELECT r.id, r.title, d.name AS department, r.salary FROM role r JOIN department d ON r.department = d.id";
const viewEmployees = "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, e2.first_name || ' ' || e2.last_name AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department = d.id LEFT JOIN employee e2 ON e.manager_id = e2.id GROUP BY e.id, r.title, d.name, r.salary, e2.first_name, e2.last_name ORDER BY e.id ASC";
const addDepartment = "INSERT INTO department (name) VALUES ($1)";

module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	addDepartment,
}