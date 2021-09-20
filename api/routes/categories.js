const router = require("express").Router();
const Category = require("../models/Category");

//CREATE CATEGORY
router.post("/", async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCat = await category.save();
    res.status(200).json(newCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CATEGORIES
router.get("/", async (req, res) => {
  try {
    const getCat = await Category.find();
    res.status(200).json(getCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
