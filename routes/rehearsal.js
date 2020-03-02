const { Router } = require("express");
const pool = require("../db");
const fetch = require("node-fetch");
const router = Router();
var moment = require("moment");

router.get("/", (request, response, next) => {
  pool.query(`SELECT * FROM rehearsal_restaurants`, (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
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
