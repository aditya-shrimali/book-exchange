const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
//66e12c18b7f9fb2bba9771aa
