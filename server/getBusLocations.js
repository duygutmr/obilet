const getSession = require('./getSession.js');
var axios = require('axios');

const getConfig = async () => {

    try {
      const rest = await getSession();

      const data = JSON.stringify({
        "data": null,
        "device-session": {
          "session-id": rest.data["session-id"],
          "device-id": rest.data["device-id"]
        },
        "date": "2016-03-11T11:33:00",
        "language": "tr-TR"
      });
      
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://v2-api.obilet.com/api/location/getbuslocations',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1'
        },
        data : data
      };

      return config;


    } catch (error) {
        console.log(error);
    }
}
const getBusLocations = async () => {

    try {
        const config = await getConfig();
        const rest = await axios(config);
        return rest.data
    } catch (error) {
        console.log(error);
    }
}

module.exports = getBusLocations
