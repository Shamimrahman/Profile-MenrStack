const mongoose = require("mongoose");
const validator = require("validator");

//to avoid problem when we use validation
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

// validation problem end
//schema start ->
//scehma holo field er val ki type hbe ta define korar nam ai

const UserSchema = new mongoose.Schema({
  name: {
    //must be string hoite hobe
    //validation
    type: String,
    required: true,
    minlength: [2, "Min two Letters"],
    maxlength: 30,
  },

  mobile: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Mail");
      }
    },
  },

  password: {
    type: String,

    required: true,
  },

  cpassword: {
    type: String,

    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },

      mobile: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },
    },
  ],
});

//password hash
//password hash

const bcrypt = require("bcryptjs");
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`Password before hashing ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`Password after hashing ${this.password}`);

    this.cpassword = await bcrypt.hash(this.password, 10);
    //database a tahole r confirm password dekhabe na
  }
  next();
});

//jsonweb token
//jwt auth
const jwt = require("jsonwebtoken");
UserSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    res.send("The error part is" + e);
    console.log("The error part is" + e);
  }
};

UserSchema.methods.addMessage = async function (name, email, mobile, message) {
  try {
    //meesages filed k target korte hobe
    this.messages = this.messages.concat({ name, email, mobile, message });
    await this.save();
    return this.messages;
  } catch (e) {
    console.log(e);
  }
};

//create collection Start and export

module.exports = mongoose.models.USER || mongoose.model("USER", UserSchema);
//express part a lagbe
//create collection end
