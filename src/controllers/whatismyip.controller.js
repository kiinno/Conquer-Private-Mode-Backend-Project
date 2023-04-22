const geoipLite = require("geoip-lite");
const asyncHandler = require("express-async-handler");
const Response = require("../utils/response");

module.exports = asyncHandler(async (req, res) => {
  const { remoteAddress, remotePort, remoteFamily } = req.socket;
  const location = geoipLite.lookup(remoteAddress);
  const vm = {
    range: [],
    country: null,
    region: null,
    eu: null,
    timezone: null,
    city: null,
    ll: [],
    metro: null,
    area: null,
  };
  res.status(200).json(
    new Response(200, {
      ip: remoteAddress,
      port: remotePort,
      family: remoteFamily,
      location: { ...(location || vm) },
    })
  );
});
