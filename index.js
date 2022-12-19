const express = require("express");
const app = express();
const videos = require('./routes/videos');

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 8080;

console.log("PORT");
console.log(PORT)
// Middleware
app.use((req, _res, next) => {
    console.log(`this is the middleware`);
    next();
});

app.use('/videos', videos)

app.use(express.static('public'));
// // Home Route
// app.get('/', (_request, response) => {
//     response.send("Hello World");
// });

app.listen(PORT, () => {
    console.log(`API server listening on ${PORT}`);
});