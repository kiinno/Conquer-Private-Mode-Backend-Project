const print = console.log;
const mongoose = require("mongoose");
const chalk = require("chalk");
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = DB_URI;
mongoose
  .connect(DB_URI)
  .then((dbConnection) => {
    const { port, host, name } = dbConnection.connections[0];
    print(chalk.bgBlue.white("Database Connection Established"));
    print(chalk.yellow(`DB HOST:`), chalk.green(host));
    print(chalk.yellow(`DB PORT:`), chalk.green(port));
    print(chalk.yellow("Collection Name:"), chalk.green(name));
    return dbConnection;
  })
  .catch((err) => {
    print(chalk.bgRed.white(`:: DATABASE ERROR :: ${err.message}`));
    process.exit(1);
  });
