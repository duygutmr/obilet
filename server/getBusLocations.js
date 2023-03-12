const getSession = require('./getSession.js');
var axios = require('axios');

var data = JSON.stringify({
  "data": null,
  "device-session": {
    "session-id": "PqtdftjloK3Kpka97+ILDzMa6D9740nggLiTzXiLlzA=",
    "device-id": "PqtdftjloK3Kpka97+ILDzMa6D9740nggLiTzXiLlzA="
  },
  "date": "2016-03-11T11:33:00",
  "language": "tr-TR"
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://v2-api.obilet.com/api/location/getbuslocations',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1'
  },
  data : data
};

const getBusLocations = async () => {

    try {
        const rest = await axios(config);
        console.log(rest.data);
        return rest.data
    } catch (error) {
        console.log(error);
    }
}

module.exports = getBusLocations

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
