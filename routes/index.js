var express = require("express");
var router = express.Router();
var User = require("../controllers/user");
const auth = require("../middleware/auth");
const Role = require("../middleware/role");
const authorize = require("../middleware/authorize");

router.get("/", function (req, res) {
  res.send("hello world");
});

router.post("/api/register", User.register);
router.post("/api/login", User.login);
router.post("/api/createdetails", User.createDetails);
router.post("/api/welcome", auth, authorize(Role.Admin), User.welcome);

module.exports = router;
