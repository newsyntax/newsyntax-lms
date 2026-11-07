const express = require("express");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controller/user");
const router = express.Router();

router
  .route("/banned")
  .get(authMiddleware, isAdminMiddleware, controller.getAllBannedUsers);

router
  .route("/user")
  .get(authMiddleware, controller.getUserInfoByItsOwn)
  .put(authMiddleware, controller.updateUserInfoByItsOwn);

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAllUsers)
  .post(authMiddleware, isAdminMiddleware, controller.create);

router
  .route("/:id")
  .get(authMiddleware, isAdminMiddleware, controller.getOneUser)
  .put(authMiddleware, isAdminMiddleware, controller.update)
  .delete(authMiddleware, isAdminMiddleware, controller.delete);

router
  .route("/:id/upgrade")
  .put(authMiddleware, isAdminMiddleware, controller.upgrade);

router
  .route("/:id/ban")
  .post(authMiddleware, isAdminMiddleware, controller.banUser)
  .delete(authMiddleware, isAdminMiddleware, controller.unBanUser);

module.exports = router;
