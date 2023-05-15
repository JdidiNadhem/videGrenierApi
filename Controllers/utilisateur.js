const util = require("util");
const conn = require("../Config/dbConnection");
const query = util.promisify(conn.query).bind(conn);
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

const SECRET_KEY = "MYSECRETKEY";

// LOGIN
exports.login = async (req, res) => {
  try {
    const { nomUtilisateur, motDePasse } = req.body;
    const user = await query(
      "SELECT * FROM UTILISATEUR WHERE nomutilisateur='" + nomUtilisateur + "'"
    );
    if (user.length === 0) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Mauvais combinaison, veuillez réessayer" }] });
    }

    // Check password
    const result = await bcrypt.compare(motDePasse, user[0].motDePasse);

    if (!result) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Mauvais combinaison, veuillez réessayer" }] });
    }


    // create a token using json webtoken
    const token = jwt.sign(
      {
        
        id: user[0].id,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Check user if exist
    const findUser = await query(
      "SELECT id,nom,prenom,nomUtilisateur FROM utilisateur WHERE nomUtilisateur='" + nomUtilisateur + "'"
    );


    return res.status(200).send({ user: findUser[0], token });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "Ne peut pas s'authentifier", error }] });
  }
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { nom, prenom, nomUtilisateur, motDePasse, reMotDePasse } = req.body; //id, nom, prenom,

    // Check user if exist
    let findUser = await query(
      "SELECT id,nom,prenom,nomUtilisateur FROM utilisateur WHERE nomUtilisateur='" + nomUtilisateur + "'"
    );
    if (findUser.length > 0) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Utilisateur existe déja !" }] });
    }

    // Check password
    if (motDePasse !== reMotDePasse) {
      return res.status(400).send({
        errors: [{ msg: "Vérifier que les deux mot de passe sont identique" }],
      });
    }

    // Hash password
    const motDePasseCrypte = bcrypt.hashSync(motDePasse, salt);
    const maxIdUser = await query(
      "SELECt MAX(id) + 1 As MAX_ID FROM UTILISATEUR"
    );

    const id = maxIdUser[0].MAX_ID ? maxIdUser[0].MAX_ID : 1


    await query(
      "INSERT INTO UTILISATEUR(id,nom,prenom,nomUtilisateur,motDePasse) " +
        "VALUES(" +
        id  +
        ",'" +
        nom +
        "','" +
        prenom +
        "','" +
        nomUtilisateur +
        "','" +
        motDePasseCrypte +
        "')"
    );

    // create a token using json webtoken
    const token = jwt.sign(
      {
        id: maxIdUser[0].MAX_ID,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Check user if exist
    findUser = await query(
      "SELECT id,nom,prenom,nomUtilisateur FROM utilisateur WHERE nomUtilisateur='" + nomUtilisateur + "'"
    );

    return res
      .status(200)
      .send({ msg: "Inscription validé", user: findUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "Ne peut pas s'inscrire", error }] });
  }
};
