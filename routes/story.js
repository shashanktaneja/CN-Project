var route = require("express").Router(),
  multer = require("../utils/multer_upload"),
  Stories = require("../models/Story"),
  pagination_results = require("../utils/pagination"),
  fs = require("fs"),
  bcrypt = require("crypto-js"),
  download = require("../utils/download");
var des = require("../utils/function/des");
route.get("/", async (req, res) => {
  try {
    var results = await pagination_results(req, res);
    if (results === "error") res.status(500).json({ error: "server error" });
  } catch {
    (err) => {
      res.status(500).json({ error: "server error" });
    };
  }
});
route.post("/download/:id", async (req, res) => {
  try {
    var results = await download(req, res);
    if (results === "error") res.status(500).json({ error: "server error" });
  } catch {
    (err) => {
      res.status(500).json({ error: "server error" });
    };
  }
});
route.get("/download/:id", (req, res) => {
  try {
    res.render("download", { id: req.params.id });
  } catch {
    (err) => {
      res.status(500).json({ error: "server error" });
    };
  }
});

// posting files using multer

route.post("/", async (req, res) => {
  try {
    multer.single("file")(req, res, async (err) => {
      const story = new Stories();
      var caption = req.file.originalname;
      await fs.readFile(`${req.file.path}`, "utf-8", async function read(
        err,
        data
      ) {
        if (err) {
          throw err;
        }
        const content = data;
        const encrypted = await des.encrypt(content, req.body.key);
        story.data = encrypted;
        story.caption = caption;
        story.key = bcrypt.SHA3(req.body.key);
        await story.save();
        res.redirect("/api/story");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = route;
