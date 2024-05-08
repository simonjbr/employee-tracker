// import Pool from the pg module
const Pool = require('pg').Pool;

// construct a Pool instance linked to the employees_db db
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'employees_db',
	password: 'asdf',
	port: 5432,
});

// export the pool instance
module.exports = pool;