//const express = require
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const cookieparser = require("cookie-parser");
require("dotenv").config();

let nameValid;

let register = (req, res) => {
  const { name, email, password } = req.body;
  //if (!name && !email && !password) return res.status(400).json({message : 'name, email, password are required'})
  if (name === undefined || name.trim().length === 0)
    return res.status(400).json({ message: "name is required" });
  if (email === undefined || email.trim().length === 0)
    return res.status(400).json({ message: "email is required" });
  if (password === undefined || password.trim().length === 0)
    return res.status(400).json({ message: "password is required" });
  let sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], (err, results, fields) => {
    if (err) return res.status(500).json({ message: "Database Error." });
    if (results.length > 0)
      return res.status(409).json({ message: "User already exists" });
    bycrpt.hash(password, 10, (err, hashPass) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password." });
      sql = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
      db.query(sql, [name, email, hashPass], (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database Error saat INSERT." });
        nameValid = name;
        const payload = { name: name, email: email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3m",
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
          expiresIn: "5m",
        });
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res
          .status(201)
          .json({ message: "register successfully", token: token });
      });
    });
  });
};

let login = (req, res) => {
  const { email, password } = req.body;
  if (email === undefined || email.trim().length === 0)
    return res.status(400).json({ message: "email is required" });
  if (password === undefined || password.trim().length === 0)
    return res.status(400).json({ message: "password is required" });

  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });
    if (result.length === 0)
      return res.status(404).json({ message: "Invalid email" });

    const userPass = result[0].password;
    bycrpt.compare(password, userPass, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password." });
      if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });
      nameValid = email;
      const payload = { email: email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3m",
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "5m",
      });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        //secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "lax",
      });

      return res.status(200).json({
        message: "login sucessfully",
        token: token,
      });
    });
  });
};

let refresh = (req, res) => {
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    const refrehToken = req.cookies.jwt;
    console.log("token", refrehToken);

    jwt.verify(refrehToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(406).json({ message: "unathorized" });
      } else {
        const accessToken = jwt.sign(
          { name: nameValid },
          process.env.JWT_SECRET,
          { expiresIn: "5m" }
        );
        return res.json({ accessToken });
      }
    });
  } else {
    return res.status(406).json({ message: "unauthorized" });
  }
};

module.exports = { register, login, refresh };
