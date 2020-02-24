const { Pool } = require("pg");

const pool = new Pool({
  user: "oneinabullion",
  host: "wedding-database.cqkxzpjtig36.us-east-1.rds.amazonaws.com",
  database: "wedding-database",
  password: "iloveyoumore2021",
  port: 5432
});

module.exports = pool;
