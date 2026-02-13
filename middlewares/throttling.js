const express = require("express");
const slowDown = require("express-slow-down");

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 40,
  delayMs: () => 2000,
});
module.exports = speedLimiter;