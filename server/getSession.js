const axios = require('axios');

const data = JSON.stringify({
  "type": 1,
  "connection": {
    "ip-address": "165.114.41.21",
    "port": "5117"
  },
  "browser": {
    "name": "Chrome",
    "version": "47.0.0.12"
  }
});

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://v2-api.obilet.com/api/client/getsession',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1'
  },
  data : data
};

const getSession = async () => {

    try {
        const rest = await axios(config);
        console.log(rest.data);
        return rest.data
    } catch (error) {
        console.log(error);
    }
}

module.exports = getSession