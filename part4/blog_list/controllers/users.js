const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user"); // Adjust the path as necessary
const usersRouter = express.Router();

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: "Username and password are required" });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password must be at least 3 characters long",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
