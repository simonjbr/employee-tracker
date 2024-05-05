const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'employees_db',
	password: 'asdf',
	port: 5432,
});

module.exports = pool;