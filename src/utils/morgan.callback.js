const chalk = require("chalk");
module.exports = (token, req, res) => {
  const { url, method, date, status } = token;
  return [
    chalk.yellow(token["remote-addr"](req, res) + ":" + req.socket.remotePort),
    "->",
    chalk.green(method(req, res)),
    chalk.whiteBright(url(req, res)),
    chalk.greenBright(status(req, res)),
    "-",
    chalk.cyanBright(date(req, res)),
    "-",
    chalk.red(token["response-time"](req, res) + "ms"),
  ].join(" ");
};
