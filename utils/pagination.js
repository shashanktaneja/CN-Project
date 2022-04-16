var Stories = require("../models/Story"),
  pagination_results = async (req, res) => {
    try {
      let story = {
        data: [],
      };
      await Stories.find({}, (err, results) => {
        story.data = results;
        res.render("home", { files: results });
        // res.status(200).json(story);
      });
    } catch (error) {
      return "error";
    }
  };
module.exports = pagination_results;
