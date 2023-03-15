const getSession = require("./getSession.js");
var axios = require("axios");

const getConfig = async ({originId , destinationId, departureDate}) => {
  try {
    const rest = await getSession();

    const data = JSON.stringify({
      "device-session": {
        "session-id": rest.data["session-id"],
        "device-id": rest.data["device-id"],
      },
      date: "2021-09-01",
      language: "tr-TR",
      data: {
        "origin-id": originId,
        "destination-id": destinationId,
        "departure-date": departureDate,
      },
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://v2-api.obilet.com/api/journey/getbusjourneys",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1",
      },
      data: data,
    };

    return config;
  } catch (error) {
    console.log(error);
  }
};
const getBusJourney = async (reqBody) => {
  try {
    const config = await getConfig(reqBody);
    const rest = await axios(config);
    return rest.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getBusJourney;
