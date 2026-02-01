const { Router } = require("express");
const authMiddlewares = require("../middlewares/auth.middlewares");
const indexController = require("../controllers/index.controller");

const router = Router();

router.get("/", authMiddlewares.authenticate, indexController.getIndexPage);

module.exports = router;
