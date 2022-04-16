var Stories = require("../models/Story");
var fs = require("fs");
var des = require("../utils/function/des");
var cryptoJs = require("crypto-js");
var download = async (req, res) => {
  try {
    await Stories.find({ _id: req.params.id }, async (err, results) => {
      if (results) {
        if (results[0].key == (await cryptoJs.SHA3(req.body.key2))) {
          var content = await des.decrypt(
            results[0].data.toString(),
            req.body.key2
          );
          fs.writeFile(
            `../../Downloads/${results[0].caption}`,
            `${content}`,
            "utf-8",
            function (err) {
              if (err) return "error";
              res.render("success");
            }
          );
        } else {
          res.render("wrong", { id: results[0]._id });
        }
      } else return "error";
    });
  } catch (error) {
    return "error";
  }
};
module.exports = download;
