const express = require("express");
const { get_produits, get_categories } = require("../Controllers/global");
const router = express.Router();


// @Desc: GET PRODUITS
// @Method: GET
// @PATH: /api/global/get_produits

router.get("/get_produits", get_produits);

// @Desc: GET CATEGORIES
// @Method: GET
// @PATH: /api/global/get_categories

router.get("/get_categories", get_categories);

module.exports = router;