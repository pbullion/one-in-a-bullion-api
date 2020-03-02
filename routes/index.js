const { Router } = require("express");
const admin = require("./admin");
const rsvp = require("./rsvp");
const rehearsal = require("./rehearsal");

const router = Router();

router.use("/admin", admin);
router.use("/rsvp", rsvp);
router.use("/rehearsal", rehearsal);

module.exports = router;
