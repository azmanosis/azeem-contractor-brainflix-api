const { application } = require("express");
const express = require("express");
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.json());

fs.readFile('data/videos.json', (error, data) => {
    if (error) {
        // handle the error
    } else {
        // use the data
    }
    const jsonData = JSON.parse(data)
});



app.listen(port, () => {
    console.log(`API server listening on ${port}`)
})

app.get('/videos', (request, response) => {
    response.send({});
});

app.get('/videos/:id', (request, response) => {
    response.send({});
});

app.post('/videos', (request, response) => {
    response.send({});
});