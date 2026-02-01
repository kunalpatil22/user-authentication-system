const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const indexRoutes = require("./routes/index.routes");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRoutes);
app.use("/", indexRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Database connection established.`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.listen(port, () => console.log(`Server running on port ${port}`));
