let express = require('express');
let router = express.Router();
const userController = require('../controllers/user.controller');
let { verifyToken } = require('../middlewares/verify_token');

router.get("/", userController.getAll);

module.exports = router;