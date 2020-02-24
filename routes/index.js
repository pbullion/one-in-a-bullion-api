const { Router } = require("express");
const admin = require("./admin");

const router = Router();

router.use("/admin", admin);

module.exports = router;
