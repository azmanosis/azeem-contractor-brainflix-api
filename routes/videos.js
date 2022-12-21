const express = require('express');
const routes = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');
const url = require('url');
const bodyparse = require('body-parser')
routes.use(bodyparse.json());
routes.use(bodyparse.urlencoded({ extended: true }));
// routes.use(express.urlencoded({ extended: true }));

function readVideos() {
    const videoFile = fs.readFileSync('./data/videos.json');
    const videosData = JSON.parse(videoFile);
    return videosData;
}

routes.get('/', (req, response) => {
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

    response.json(strippedData);
});

routes.get('/:id', (req, response) => {
    const videoRequested = url.parse(req.url)
    const videoId = videoRequested.pathname.replace('/', '')

    const videoData = readVideos();
    const filteredVideo = videoData.filter(video => video.id === videoId)[0]

    response.json(filteredVideo);
});

function writeVideos(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/videos.json', stringifiedData)
}

routes.post('/', (req, res) => {

    const videosData = readVideos();
    const { title, description } = req.body;

    const newVideo = {
        id: uniqid(),
        title,
        channel: 'New video uploaded',
        image: "http://localhost:8080/Upload-video-preview.jpg",
        description,
        views: '2004',
        likes: '66,040',
        duration: "4:01",
        timestamp: '08/09/2022',
        comments: "Hello World"
    };


    videosData.push(newVideo);

    writeVideos(videosData);

    res.status(201).json(newVideo);
});

module.exports = routes;