const getBusLocations = require('./getBusLocations.js');
const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/getBusLocation', async (req, res) => {
    try {
        const busLocations = await getBusLocations();
        res.send(busLocations);
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});