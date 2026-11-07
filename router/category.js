const express = require("express");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controller/category");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, controller.create)
  .get(controller.getAll);

router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, controller.update)
  .delete(authMiddleware, isAdminMiddleware, controller.delete);

module.exports = router;
