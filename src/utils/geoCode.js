const request = require("request");
//function
const geoCode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZnVycWFuMDkiLCJhIjoiY2tpMzhkdjluMDI4dTJxbnU2eDBycGhhdCJ9.0dvYSFgJDcMR03CnioJx3Q&limit=1`;
  request({ url, json: true }, function (err, { body }) {
    if (err) {
      callback("connection error", undefined);
    } else if (body.features.length !== 0) {
      const obj = {
        longitude: body.features[0].center[1],
        latitude: body.features[0].center[0],
      };
      callback(undefined, obj);
    } else {
      callback(` ${location} not found `, undefined);
    }
  });
};
//exports
module.exports = geoCode;
