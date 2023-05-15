const express = require("express");
const router = express.Router();

const { login, register } = require("../Controllers/utilisateur");
const {
  registerValidation,
  validation,
  loginValidation,
} = require("../Middlewares/utilisateur.middleware");
const { authUtilisateur } = require("../Middlewares/authUtilisateur");

// @Desc: Login Utilisateur
// @Method: POST
// @PATH: /api/utilisateur/login

router.post("/login", loginValidation(), validation, login);

// @Desc: Register Utilisateur
// @Method: POST
// @PATH: /api/utilisateur/register

router.post("/register", registerValidation(), validation, register);


// Current utilisateur
router.get("/current",authUtilisateur, (req, res) => {
  res.send(req.utilisateur);
});

module.exports = router;
