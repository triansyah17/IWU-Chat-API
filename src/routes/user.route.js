const express = require("express");
const validation = require("../validations/user.validation");
const runValidation = require("../middlewares/runValidation");
const jwtAuth = require("../middlewares/jwtAuth");
const upload = require("../middlewares/upload");
const photoLimit = require("../middlewares/photoLimit");
const {
  list,
  detail,
  updatePhoto,
  updateProfile,
} = require("../controllers/user.controller");

const router = express.Router();

router
  .get("/user", list)
  .get("/user/:id", jwtAuth, detail)
  .put(
    "/user/:id",
    jwtAuth,
    validation.updateProfile,
    runValidation,
    updateProfile
  )
  .put("/user/:id/photo", jwtAuth, upload, photoLimit, updatePhoto);

module.exports = router;
