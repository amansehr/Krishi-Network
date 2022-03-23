const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const Joi = require("joi");

const validate = require("../middlewares/validate.middleware");

const loginPasswordSchema = Joi.object().keys({
  emailId: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});
const signupSchema = Joi.object().keys({
  emailId: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});


router.post("/login", validate(loginPasswordSchema), AuthController.login);
router.post("/signup",validate(signupSchema),AuthController.signUpEmailPassword);
module.exports = router;