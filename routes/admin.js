let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("admin", { title: "Bluff Admin" });
});

router.get("/question/form", (req, res) => {
  res.render("question-upload", { title: "Upload questions" });
});

module.exports = router;
