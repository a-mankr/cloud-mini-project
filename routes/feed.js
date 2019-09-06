let express = require("express");
let router = express.Router();
// let Participants = require("../models/Participants");
// let dbOps = require("../config/mysqlInit");
// dbOps.initDB();

// router.get("/", (req, res) => {
//   Participants.findAll().then(projects => {
//     console.log(projects);
//   });
//   res.send("something");
// });

// router.post("/participants", (req, res, next) => {
//   let { p_name, p_college } = req.body;
//   dbOps.connection.query(
//     `INSERT INTO participants values(
//         '${p_name}',
//         '${p_college}'
//         )`,
//     (err, rows, fields) => {
//       if (err) throw err;
//     }
//   );
//   dbOps.terminateDB();
//   res.send(req.body);
// });

module.exports = router;
