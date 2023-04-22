const express = require("express");
const mainRouter = express.Router();

// Mounting Routes
const userRouter = require("./user.route");
const featuresRouter = require("./feature.route");
const storeRouter = require("./store.route");
const whatIsMyIp = require("../controllers/whatismyip.controller");

mainRouter.use("/user", userRouter);
mainRouter.use("/feature", featuresRouter);
mainRouter.use("/store", storeRouter);

mainRouter.get("/ip", whatIsMyIp);

/**
 * Root Router
 * @endPoint /
 */
module.exports = mainRouter;
