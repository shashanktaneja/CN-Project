var mongoose = require("mongoose");
var connectdb = () => {
  mongoose
    .connect(process.env.Mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then(() => console.log("database conmected"))
    .catch((err) => console.log(err));
};
module.exports = connectdb;
