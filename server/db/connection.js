const mongoose = require("mongoose");
const dotenv = require("dotenv");
// connect db of mongodb atlast
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connection Successful"))
  .catch(
    (err) => console.log(err)

    //then r catch part ai hoilo promise
  );
//connection of db end
