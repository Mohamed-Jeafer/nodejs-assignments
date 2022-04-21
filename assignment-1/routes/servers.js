const express = require("express");
const findServer = require("../controllers/servers");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.get("/find-server", asyncHandler(findServer));

module.exports = router;
