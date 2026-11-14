const express = require("express");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const uploader = require("../util/uploader");
const controller = require("../controller/course");
const router = express.Router();

router
  .route("/")
  .get(controller.getAll)
  .post(
    authMiddleware,
    isAdminMiddleware,
    uploader("./public/cover").single("cover"),
    controller.create,
  );

router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, controller.update)
  .delete(authMiddleware, isAdminMiddleware, controller.remove);

router.route("/href").get(controller.getCourseDetails);

module.exports = router;
