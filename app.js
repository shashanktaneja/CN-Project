require("dotenv").config();
var express = require("express"),
  app = express(),
  connectdb = require("./models/mongodb");

//for body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//connecting databse
connectdb();

//routes
app.use("/api/story", require("./routes/story"));

//starting server
app.listen(process.env.PORT || 5000);
