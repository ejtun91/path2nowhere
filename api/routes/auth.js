const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong user or credentials");

    const matchPass = await bcrypt.compare(req.body.password, user.password);
    !matchPass && res.status(401).json("wrong username or credentials");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
