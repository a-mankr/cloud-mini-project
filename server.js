let express = require("express");
let bodyParser = require("body-parser");
let app = express();

let indexRouter = require("./routes/index");
let adminRouter = require("./routes/admin");
let feedRouter = require("./routes/feed");
let fetchRouter = require("./routes/fetch");

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/feed", feedRouter);
app.use("/fetch", fetchRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("live at 3000");
});
