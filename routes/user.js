const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Sign-up
router.post("/sign-in", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;

    const existingUser = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });
    await newUser.save();
    return res.status(200).json({ message: "SignIn Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error!" });
  }
});

//Login
router.post("/login", async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    bcrypt.compare(
      password,
      existingUser.password,
      (err, data) => {
        if (data) {
            const authClaims = [{name:username},{jti:jwt.sign({},"pmtPM")}];
          const token = jwt.sign({ authClaims }, "pmtPM", { expiresIn: "2d" });
          res.status(200).json({id:existingUser.id , token: token});
        } else {
          return res
            .status(400)
            .json({ message: "Invalid username or password" });
        }
      }
    );
});

module.exports = router;
