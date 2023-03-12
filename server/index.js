const getSession = require('./getSession.js');
const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/getBusLocation', (req, res) => {
    try {
        const session = getSession();
        console.log(session);
    } catch (error) {
        console.log(error);
    }
    res.send('Hello World!');
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});