const validateMiddleware = require("../middleware/validate.middleware");
const educator = require("../middleware/educator.middleware");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const { validate, validatePatch } = require("../model/task.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const taskController = require("../controllers/task.controllers");

// This is used for registering a new task.
router.post(
  "/",
  auth,
  educator,
  validateMiddleware(validate),
  asyncMiddleware(taskController.addNewTask)
);

router.get("/", asyncMiddleware(taskController.fetchAllTasks));

router.get(
  "/userId/:id",
  validateObjectId,
  asyncMiddleware(taskController.getTaskByCourseId)
);

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(taskController.gethTaskById)
);

router.put(
  "/:id",
  validateObjectId,
  // auth is used to make authenticate a task.
  auth,
  validateMiddleware(validatePatch),
  asyncMiddleware(taskController.updateTaskById)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(taskController.deleteTask)
);
module.exports = router;
