var express = require("express");
var router = express.Router();
var User = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/", function (req, res) {
  res.send("hello world");
});

router.post("/api/register", User.register);
router.post("/api/login", User.login);
router.get("/api/welcome", auth, User.welcome);

module.exports = router;
