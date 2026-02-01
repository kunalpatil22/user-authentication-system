const User = require("../models/User.model");

const getIndexPage = async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    res.render("index", { user });
  } catch (err) {
    res.status(500).send({ error_message: "Something went wrong." });
  }
};

module.exports = { getIndexPage };
