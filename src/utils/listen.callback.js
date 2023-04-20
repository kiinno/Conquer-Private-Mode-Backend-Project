const cfonts = require("cfonts");
module.exports = (port, host) => () => {
  const debug = process.env.NODE_ENV == "development" ? "ON" : "OFF";
  cfonts.say("WELCOME", {
    align: "center",
    gradient: ["magenta", "blue"],
    space: true,
  });
  cfonts.say(`DEBUGING: ${debug}`, {
    align: "left",
    gradient: ["magenta", "blue"],
    font: "chrome",
    space: true,
  });
  cfonts.say(`PORT: ${port}`, {
    align: "left",
    gradient: ["magenta", "blue"],
    font: "chrome",
    space: false,
  });
  cfonts.say(`HOST: ${host}`, {
    align: "left",
    gradient: ["magenta", "blue"],
    font: "chrome",
    space: true,
  });
  cfonts.say("Listening Now\n----", {
    align: "center",
    gradient: ["magenta", "blue"],
    font: "chrome",
    space: false,
  });
};
