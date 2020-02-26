const { Router } = require("express");
const pool = require("../db");
const fetch = require("node-fetch");
const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM invitations ORDER BY id asc", (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.get("/status", (request, response, next) => {
  if (err) return next(err);
  response.status(201).json({ message: "hello" });
});

router.post("/", (request, response, next) => {
  const {
    first_name_a,
    last_name_a,
    first_name_b,
    last_name_b,
    address,
    address_apt_number,
    address_city,
    address_state,
    address_zip,
    relation,
    side,
    email,
    email_alt,
    total_adults,
    total_kids
  } = request.body;
  pool.query(
    "INSERT INTO invitations(first_name_a, last_name_a, first_name_b, last_name_b, address, address_apt_number, address_city, address_state, address_zip, relation, side, email, email_alt, total_adults, total_kids) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
    [
      first_name_a,
      last_name_a,
      first_name_b,
      last_name_b,
      address,
      address_apt_number,
      address_city,
      address_state,
      address_zip,
      relation,
      side,
      email,
      email_alt,
      total_adults,
      total_kids
    ],
    (err, res) => {
      if (err) return next(err);
      response.status(201).json({
        message: "Created invite successfully"
      });
    }
  );
});

router.get("/bySide/:side", (request, response, next) => {
  const { side } = request.params;
  pool.query(
    "SELECT * FROM invitations WHERE side = $1 ORDER BY id asc",
    [side],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/totals", (request, response, next) => {
  pool.query(
    "SELECT SUM (total_adults) AS total_adults, SUM (total_kids) AS total_kids FROM invitations",
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/totals/:side", (request, response, next) => {
  const { side } = request.params;
  pool.query(
    "SELECT SUM (total_adults) AS total_adults, SUM (total_kids) AS total_kids FROM invitations WHERE side = $1",
    [side],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/totals/:relation/:side", (request, response, next) => {
  const { side, relation } = request.params;
  pool.query(
    "SELECT SUM (total_adults) AS total_adults, SUM (total_kids) AS total_kids FROM invitations WHERE side = $1 AND relation = $2",
    [side, relation],
    (err, res) => {
      if (err) return next(err);
      response.json(...res.rows);
    }
  );
});

router.get("/invitation/:first_name/:last_name", (request, response, next) => {
  const { first_name, last_name } = request.params;
  pool.query(
    "select * from invitations where first_name_a = $1 and last_name_a = $2 or first_name_b = $1 and last_name_b = $2",
    [first_name, last_name],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE FROM invitations WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);
    response.status(201).json({
      message: "Message deleted successfully"
    });
  });
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const keys = Object.keys(request.body);
  const fields = [];

  keys.forEach(key => {
    if (request.body[key] !== null) fields.push(key);
  });
  fields.forEach((field, index) => {
    pool.query(
      `UPDATE invitations SET ${field}=($1) WHERE id=$2`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) {
          response.send("it was updated");
        }
      }
    );
  });
});

module.exports = router;
