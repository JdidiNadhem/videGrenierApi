const util = require("util");
const conn = require("../Config/dbConnection");
const query = util.promisify(conn.query).bind(conn);

exports.get_categories = async (req, res) => {
  try {
    const categories = await query("SELECT * FROM CATEGORIE");

    return res.status(200).send({ categories });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({
        errors: [{ msg: "Ne peut pas afficher les categories", error }],
      });
  }
};

exports.get_produits = async (req, res) => {
  try {
    const produits = await query("SELECT * FROM PRODUIT WHERE ACTIF=1");

    return res.status(200).send({ produits });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "Ne peut pas afficher les produits", error }] });
  }
};
