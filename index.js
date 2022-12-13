const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://localhost/instaclone"
const mongoose = require('mongoose');
mongoose.connect(dbUrl, () => console.log("Database Connected"))


app.use(express.urlencoded());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to instaclone backend servie')
})

app.use('/post', postRoutes);

app.use('/*', (req, res) => {
    res.status(404).send('Page Not Found');
})







app.listen(PORT, () => console.log('Server is on PORT', PORT));