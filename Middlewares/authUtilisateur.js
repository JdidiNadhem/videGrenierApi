const util = require("util");
const conn = require("../Config/dbConnection");
const query = util.promisify(conn.query).bind(conn);
const jwt = require("jsonwebtoken");

exports.authUtilisateur = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];

    // if the token is undefined =>
    if (!token) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Utilisateur non autoriser" }] });
    }

    // get the id from the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // search Utilisateur
    const utilisateur = await query(
      "SELECT id,nom,prenom,nomUtilisateur FROM utilisateur WHERE id=" +
        decoded.id
    );
    // send not authorisation IF NOT Utilisateur
    if (utilisateur.length === 0) {
      return res
        .status(400)  
        .send({ errors: [{ msg: "Utilisateur non autoriser" }] });
    }

    // if client exist
    req.utilisateur = utilisateur[0];

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errors: [{ msg: "Session expiré" }] });
  }
};
