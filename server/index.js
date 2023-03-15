const getBusLocations = require('./getBusLocations.js');
const getBusJourney = require('./getBusJourney.js');
const express = require('express');
const cors = require('cors');
const getSession = require('./getSession.js');
const app = express()

app.use(express.json());

app.use(cors())

app.post('/getJourney', async (req, res) => {
    try {
        console.log(req.body);
        const busJourney = await getBusJourney(req.body);
        res.send(busJourney);
    } catch (error) {
        console.log(error);
    }
})

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