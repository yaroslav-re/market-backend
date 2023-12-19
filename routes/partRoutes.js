const express = require("express");
const partControllers = require("../controllers/partControllers");

const router = express.Router();

// route - /api/parts
router
  .route("/")
  .get(partControllers.getAllParts)
  .post(partControllers.createNewPart);

// route - /api/parts/:id
router
  .route("/:id")
  .put(partControllers.updatePartById)
  .delete(partControllers.deletePartById)
  .get(partControllers.getPartById);

module.exports = router;
