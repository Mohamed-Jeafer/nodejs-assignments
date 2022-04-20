const express = require("express");
const findServer = require("../controllers/servers");

const router = express.Router();

router.get("/find-server", findServer);

module.exports = router;
