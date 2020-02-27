const { Router } = require("express");
const admin = require("./admin");
const rsvp = require("./rsvp");

const router = Router();

router.use("/admin", admin);
router.use("/rsvp", rsvp);

module.exports = router;
