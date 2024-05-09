# employee-tracker

[![License: MIT](https://shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The employee-tracker is a Content Management System (CMS) that will allow users to interact with employee data stored in a PostgreSQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

In order to run the application the user must have [node.js](https://nodejs.org/en/download/current) installed. Then the user must install dependencies (Inquirer@8.2.4, console.table, and pg) by running `npm i` on the command line in the root directory of the repository.

Users must also have [PostgreSQL](https://www.postgresql.org/download/) installed and open an instance of the psql shell in the /db directory.
From there, in order to create and seed the database run the following commands:
- `\i schema.sql`
- `\i seeds.sql`
- `\q` to exit the shell

Finally, update the values for `user` and/or `password` in the `Pool` constructor in `/src/db.js` to your desired PostgreSQL username and password.

## Usage

To start the application the user must run `npm start`.

The user will then be greeted with the Main Menu where they can choose from the following options:
- View All Employees
- Add Employee *
- Update Employee Role *
- View All Roles
- Add Role *
- View All Departments
- Add Department *
- Quit

`* these actions will require further inputs to apply changes to the database`

Find the video walkthrough here:
[Video Walkthrough](https://drive.google.com/file/d/1nsxws6fh27Z8UBewEeIBAznvOH13Eto_/view)

## Credits

[simonjbr](https://github.com/simonjbr)

[Node.js](https://nodejs.org/en)

[Inquirer](https://www.npmjs.com/package/inquirer)

[PostgreSQL](https://www.postgresql.org/)

[pg](https://www.npmjs.com/package/pg)

## License

Please refer to [MIT license](./LICENSE) information in the repository.