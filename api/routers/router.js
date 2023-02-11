let express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
router.use(cors());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());

router.use("/api/auth", require("./auth.router"));
router.use("/api/user", require("./user.router"));
router.use("/api/log", require("./log.router"));

module.exports = router;