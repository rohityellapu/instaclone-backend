if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL || "mongodb://localhost/instaclone"
const mongoose = require('mongoose');
mongoose.connect(dbUrl, () => console.log("Database Connected"))
const postRoutes = require('./routes/post')
const portifolioRoutes = require('./routes/portifolio')
const cors = require('cors');
var whitelist = ['https://instaclone-by-rohityellapu.onrender.com', 'https://rohityellapu-portifolio.vercel.app']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));


app.use(express.urlencoded());
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('form.ejs');
})



app.use('/post', postRoutes);
app.use('/portifolio', portifolioRoutes);
app.use('/*', (req, res) => {
    res.status(404).send('Page Not Found');
})


app.listen(PORT, () => console.log('Server is on PORT', PORT));