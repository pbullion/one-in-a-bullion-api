const { Router } = require("express");
const pool = require("../db");
const fetch = require("node-fetch");
const router = Router();
var moment = require("moment");

router.get("/:first_name/:last_name", (request, response, next) => {
  const { first_name, last_name } = request.params;
  pool.query(
    `SELECT * FROM invitations where lower(first_name_a) = lower($1) and lower(last_name_a) = lower($2) or lower(first_name_b) = lower($3) and lower(last_name_b) = lower($4)`,
    [first_name, last_name, first_name, last_name],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows[0]);
    }
  );
});

router.get("/list", (request, response, next) => {
  pool.query(
    `select * from invitations where rsvp_yes_adults > 0 or rsvp_yes_kids > 0 or rsvp_no_adults > 0 order by rsvp_time desc`,
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const keys = Object.keys(request.body);
  const fields = [];

  keys.forEach(key => {
    if (request.body[key] !== null) fields.push(key);
  });
  const timestamp = moment().format();

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE invitations SET ${field}=($1) WHERE id=$2`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) {
          pool.query(
            `UPDATE invitations SET rsvp_time = current_timestamp WHERE id=$1`,
            [id],
            (err, res) => {
              if (err) return next(err);
              response.send("it was updated");
            }
          );
        }
      }
    );
  });
});

module.exports = router;
