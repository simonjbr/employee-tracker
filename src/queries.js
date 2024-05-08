const viewDepartments = "SELECT * FROM department";
const viewRoles = "SELECT r.id, r.title, d.name AS department, r.salary FROM role r JOIN department d ON r.department = d.id";
const viewEmployees = "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, e2.first_name || ' ' || e2.last_name AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department = d.id LEFT JOIN employee e2 ON e.manager_id = e2.id GROUP BY e.id, r.title, d.name, r.salary, e2.first_name, e2.last_name ORDER BY e.id ASC";
const addDepartment = "INSERT INTO department (name) VALUES ($1)";
const getDeptId = "SELECT department.id FROM department WHERE department.name = $1";
const addRole = "INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)";
const getEmployees = "SELECT employee.first_name || ' ' || employee.last_name AS name FROM employee";
const getRoleId = "SELECT role.id FROM role WHERE role.title = $1";
const getEmployeeId = "SELECT employee.id FROM employee WHERE employee.first_name || ' ' || employee.last_name = $1";
const addEmployee = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
const updateEmployeeRole = "UPDATE employee SET role_id = $1 WHERE id = $2";

module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	addDepartment,
	getDeptId,
	addRole,
	getEmployees,
	getRoleId,
	getEmployeeId,
	addEmployee,
	updateEmployeeRole,
}