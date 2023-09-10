const asyncHandler = require("../middleware/asyncHandler");
const Part = require("../models/Part");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllParts = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  const removeFields = ["sort"];
  removeFields.forEach((val) => delete reqQuery[val]);

  let queryString = JSON.stringify(reqQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );

  query = Part.find(JSON.parse(queryString));

  if (req.query.sort) {
    const sortByArray = req.query.sort.split(",");
    const sortByString = sortByArray.join(" ");
    query = query.sort(sortByString);
  } else {
    query = query.sort("price");
  }

  const parts = await query;
  res.status(200).json({ success: true, data: parts });
});

exports.createNewPart = asyncHandler(async (req, res, next) => {
  const part = await Part.create(req.body);
  res.status(201).json({ success: true, data: part });
});

exports.updatePartById = asyncHandler(async (req, res, next) => {
  let part = await Part.findById(req.params.id);
  if (!part) {
    return next(
      new ErrorResponse(`part with id: ${req.params.id} wasn't found`, 404),
    );
  }
  part = await Part.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ success: true, data: part });
});

exports.deletePartById = asyncHandler(async (req, res, next) => {
  let part = await Part.findById(req.params.id);
  if (!part) {
    return next(
      new ErrorResponse(`part with id: ${req.params.id} wasn't found`, 404),
    );
  }
  await Part.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
