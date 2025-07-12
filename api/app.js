const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtSign = util.promisify(jwt.sign);
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
const taskRoutes = require("./routes/Task.routes");

const salt = bcrypt.genSaltSync(10);
const allowedOrigins = [
  "http://localhost:5173", // for local development
  process.env.FRONTEND_URL, // for deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
//suryakantamazumder9 xWoOYrLwAO8JAer0
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URL);

app.use("/api/tasks", taskRoutes);
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      // Email already exists
      return res.status(409).json({ message: "Email already registered" });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ message: "Validation error", errors: messages });
    }

    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isLoggedUser = await userModel.findOne({ email });

    if (!isLoggedUser) {
      return res.status(404).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, isLoggedUser.password);
    if (!passOk) {
      return res.status(401).json("Password incorrect");
    }

    const token = jwt.sign(
      {
        email: isLoggedUser.email,
        id: isLoggedUser._id,
        name: isLoggedUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in cookie and response
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // set to true in production w/ HTTPS
      })
      .json({
        token,
        user: isLoggedUser,
      });

    console.log("✅ Login successful:", token, isLoggedUser);
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json("Login failed");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, tokendata) => {
      if (err) throw err;
      const { name, email, _id } = await userModel.findById(tokendata.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
app.listen(process.env.PORT || 4040, () => {
  console.log("Server running on port", process.env.PORT || 4040);
});
