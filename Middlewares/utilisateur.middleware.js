const { validationResult, check } = require("express-validator");

exports.loginValidation = () => [
  check("nomUtilisateur", "Nom utilisateur est obligatoire").not().isEmpty(),
  check("motDePasse", "Mot de passe est obligatoire! ").not().isEmpty(),
];

exports.registerValidation = () => [
  check("nom", "Le nom est obligatoire!").not().isEmpty(),
  check("prenom", "Le prenom est obligatoire!").not().isEmpty(),
  check("nomUtilisateur", "Nom utilisateur est obligatoire").not().isEmpty(),
  check("motDePasse", "Mot de passe est obligatoire! ").not().isEmpty(),
  check("reMotDePasse", "Répeter mot de passe est obligatoire! ").not().isEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};