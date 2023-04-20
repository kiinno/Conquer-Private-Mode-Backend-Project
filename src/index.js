const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");

const jsonParser = express.json;

const app = express();

// Load Environment Variables
const { parsed: env } = dotenv.config({
  path: path.join(__dirname, "configs/config.env"),
});

// Set The Environment Mode
app.set(
  "env",
  process.env.NODE_ENV === "production" ? "production" : "development"
);

// Connect With Database
const DB_CONNECTION_URL = require("./configs/connect.mongoose");

// Mouting Main Middlewares
const morganCallback = require("./utils/morgan.callback");
const listenCallback = require("./utils/listen.callback");
const errorMiddlewares = require("./middlewares/errors.middleware");

// Initialize HTTP-REQUEST Logger In Debug Mode
if (app.get("env") === "development") {
  app.use(morgan(morganCallback));
}

// Serve Upload Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Auxalaries Middlewares
app.use(
  cors(),
  express.urlencoded({ extended: true }),
  jsonParser({ limit: "1kb" }),
  helmet()
);

// Mounting Routes
const mainRouter = require("./routes/main.route");

app.use("/api", mainRouter);

// 404 Handler
app.use("*", errorMiddlewares.pageNotFound);

// Errors Handler
app.use(errorMiddlewares.errorHandler);

const port = env.PORT || 3000;
const host = env.HOST || "127.0.0.1";
app.listen(+port, host, listenCallback(port, host));
