const { Pool } = require("pg");

const pool = new Pool({
  user: "weddingAdmin",
  host: "weddingdbprod.cluysew5vnmx.us-west-2.rds.amazonaws.com",
  database: "weddingdb",
  password: "iloveyoumore2021",
  port: 5432
});

module.exports = pool;
