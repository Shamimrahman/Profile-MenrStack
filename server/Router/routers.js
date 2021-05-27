const express = require("express");
const app = express();
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/connection");
const User = require("../Model/userSchema");
const Admin = require("../Model/adminSchema");

//routing

router.post("/register", async (req, res) => {
  const { name, address, email, mobile, profession, password, cpassword } =
    req.body;

  if (
    !name ||
    !address ||
    !email ||
    !mobile ||
    !profession ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "Some fields are empty" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords don't match" });
    } else {
      const user = new User({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        mobile: req.body.mobile,
        profession: req.body.profession,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });

      await user.save();
      res.status(201).json({
        message: "user registered successfully",
      });

      //gwt token
      const token = await user.generateAuthToken();
      console.log(`The token is ${token}`);
      //generate cookies
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usermail = await User.findOne({ email: email });
    const ismatch = await bcrypt.compare(password, usermail.password);

    //middle ware to auth profile and so on generate cookie and get cookie
    const token = await usermail.generateAuthToken();
    console.log(`The login token part is ${token}`);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (ismatch) {
      res.status(200).send("Login Success");
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    res.status(400).send("Email not Found");
  }
});

//get profile data
const auth = require("../Middleware/auth");

router.get("/profile", auth, (req, res) => {
  res.send(req.rootUser);
});

//get data for home page and contact page
router.get("/getdata", auth, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contact", auth, async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;
    if (!name || !mobile || !email || !message) {
      res.status(422).json({ message: "Empty Field" });
    }
    //now find the user is he/she exiist or not
    //we get req.userId from auth
    const userContact = await User.findOne({ _id: req.userId });

    if (userContact) {
      const user = await userContact.addMessage(name, mobile, email, message);

      await userContact.save();
      res.status(201).json({ message: "Send Succesfully" });
    }
  } catch (error) {
    window.alert("Please Login to Send Review");
  }
});

//logout
router.get("/logout", auth, (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("Logout Succeed");
});

//admin

router.post("/adminreg", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ message: "Empty Fields" });
    try {
      const adminexists = await Admin.findOne({ email: email });
      if (adminexists) {
        res.status(422).send("Admin Already Existing");
      } else if (password != cpassword) {
        res.status(422).send("Password Not Match");
      } else {
        const admin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          cpassword: req.body.cpassword,
        });
        await admin.save();
        res.status(200).send("Done");

        const token = await admin.generateAuthAdminToken();
        console.log(`The token is ${token}`);
        //generate cookies
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
      }
    } catch (error) {}
  }
});
module.exports = router;
