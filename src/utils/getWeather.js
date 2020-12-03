const request = require("request");
//function
const getWeather = (lat, long, callback) => {
  let apiKey = "0cf0be7893b5207a72d08d4fab3cd186";
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

  request({ url: url, json: true }, function (err, { body }) {
    if (err) {
      callback("there is some issue, could not connect", undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else {
      const { weather, main } = body;
      callback(
        undefined,
        `might be ${weather[0].description} and temperature feels like ${main.temp} degree celsius`
      );
    }
  });
};
//exports
module.exports = getWeather;
