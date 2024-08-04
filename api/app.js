const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const salt = bcrypt.genSaltSync(10);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const jwtSecret = "kfkdflksflkfpdepeperrcf";
mongoose.connect(process.env.MONGO_URL);
console.log(process.env.MONGO_URL);
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });
  } catch (error) {
    res.status(422).json(error);
  }

  res.json(newUser);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let isLoggedUser = await userModel.findOne({ email });
    if (isLoggedUser) {
      const passOk = bcrypt.compareSync(password, isLoggedUser.password);
      if (passOk) {
        jwt.sign(
          {
            email: isLoggedUser.email,
            id: isLoggedUser._id,
            name: isLoggedUser.name,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(isLoggedUser);
          }
        );
      } else {
        res.status(404).json("password not matched");
      }
    } else {
      res.json("Not found");
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

app.listen(4040);
