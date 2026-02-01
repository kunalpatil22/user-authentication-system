const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userValidators = require("../validators/user.validators");
const User = require("../models/user.model");

const getRegisterPage = async (req, res) => {
  res.render("register");
};

const register = async (req, res) => {
  try {
    const validatedInput =
      await userValidators.userRegisterValidator.validateAsync(req.body);

    const user = await User.findOne({ email: validatedInput.email });

    if (user)
      return res
        .status(400)
        .render("register", { error_message: "Email already in use." });

    await User.create(validatedInput);
    res.redirect("login");
  } catch (err) {
    if (err instanceof Joi.ValidationError) {
      return res.status(400).render("register", { error_message: err.message });
    }
    res
      .status(500)
      .render("register", { error_message: "Something went wrong." });
  }
};

const getLoginPage = async (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  try {
    const validatedInput =
      await userValidators.userLoginValidator.validateAsync(req.body);

    const user = await User.findOne({ email: validatedInput.email });

    if (!user)
      return res
        .status(400)
        .render("login", { error_message: "Invalid Email or Password." });

    const passwordMatched = await bcrypt.compare(
      validatedInput.password,
      user.password,
    );

    if (!passwordMatched)
      return res
        .status(400)
        .render("login", { error_message: "Invalid Email or Password." });

    const auth_token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("auth_token", auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/");
  } catch (err) {
    res.status(500).render("login", { error_message: "Something went wrong." });
  }
};

const logout = async (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.redirect("/login");
};

module.exports = { getRegisterPage, register, getLoginPage, login, logout };
