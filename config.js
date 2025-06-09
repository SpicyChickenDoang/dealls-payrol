require('dotenv').config();

const poolConfig = {
    max: 5,
    min: 2,
    idleTimeoutMillis: 600_000
}

const _Database = process.env.DB_Database;
const _Username = process.env.DB_Username;
const _Password = process.env.DB_Password;

poolConfig.connectionString = `postgres://${_Username}:${_Password}@localhost:5432/${_Database}`;

module.exports = { poolConfig }