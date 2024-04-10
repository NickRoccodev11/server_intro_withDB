const Pool = require("pg").Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'PGpass123!',
  host: 'localhost',
  port: 5432,
  database: 'pets'
});

module.exports = pool;