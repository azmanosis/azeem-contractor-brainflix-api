const { response } = require('express');
const express = require('express');
const routes = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');
const url = require('url');

function readVideos() {
    const videoFile = fs.readFileSync('./data/videos.json');
    const videosData = JSON.parse(videoFile);
    return videosData;
}

routes.get('/', (req, res) => {
    const videosData = readVideos();

    const strippedData = videosData.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
            description: video.description,
            views: video.views,
            likes: video.likes,
            duration: video.duration,
            timestamp: video.timestamp
        };
    });

    res.json(strippedData);
});

routes.get('/:id', (req, res) => {
    const videoRequested = url.parse(req.url)
    const videoId = videoRequested.pathname.replace('/', '')

    const videoData = readVideos();
    const filteredVideo = videoData.filter(video => video.id === videoId)[0]

    res.json(filteredVideo);
});

function writeVideos(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/videos.json', stringifiedData)
}

routes.post('/upload', (_req, res) => {
    const videosData = readVideos();

    const newVideo = {
        id: uniqid(),
        title: _req.body.title,
        description: 'Placeholder description'
    };

    videosData.push(newVideo);

    writeVideos(videosData);

    res.status(201).json(newVideo);
})

module.exports = routes;











// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const { uuid } = require('uuid');

// router.use(express.json());

// const videos_filepath = "./data/videos.json";

// // router function for GET requests

// router.route('/').get((req, res) => {
//     // get videos data from videos.json
//     // copy the array of video object and assign to a new variable and return response.
// })

// // app.get('/videos', (request, response) => {
// //     response.send({});
// // });

// // 

// app.get('/videos/:id', (request, response) => {
//     response.send({});
// });



// app.post('/videos', (request, response) => {
//     response.send({});
// });