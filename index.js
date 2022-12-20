const express = require("express");
const app = express();
const videos = require('./routes/videos');
const cors = require('cors');

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 8080;

console.log("PORT");
console.log(PORT)
app.use(cors());
// Middleware
app.use((req, _res, next) => {
    console.log(`this is the middleware`);
    next();
});

app.use('/videos', videos)

app.use(express.static('./public/images'));

app.listen(PORT, () => {
    console.log(`API server listening on ${PORT}`);
});