const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/auth.middlewares");

const router = Router();

router.get(
  "/register",
  authMiddlewares.redirectIfAuthenticated,
  authController.getRegisterPage,
);
router.post(
  "/register",
  authMiddlewares.redirectIfAuthenticated,
  authController.register,
);
router.get(
  "/login",
  authMiddlewares.redirectIfAuthenticated,
  authController.getLoginPage,
);
router.post(
  "/login",
  authMiddlewares.redirectIfAuthenticated,
  authController.login,
);

router.get("/logout", authController.logout);

module.exports = router;
