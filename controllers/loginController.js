const asyncHandler = require("../middleware/asyncHandler");

exports.createNewUser = asyncHandler(async (req, res, next) => {
  res.send("success")
});