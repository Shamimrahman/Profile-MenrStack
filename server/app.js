const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const fileRoutes = require("./Router/routers");
var cookieParser = require("cookie-parser");

//for use in all file
dotenv.config({ path: "./config.env" });
app.use(cors());

// connect db of mongodb atlast
//connect mongobd db
require("./db/connection");
//connection of db end

app.use(cookieParser());

//to get json data from postamn
app.use(express.json());

//to get json data from frontend
//Get data from ui
app.use(express.urlencoded({ extended: false }));

//get router
const router = require("./Router/routers");
app.use(router);
//get router end

//image er dir select kora
app.use(bodyParser.json());

//image er dir select kora

//use router

//use router

app.listen(port, () => {
  console.log(`Connected from ${port} host`);
});
