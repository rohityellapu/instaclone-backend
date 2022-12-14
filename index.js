if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://localhost/instaclone"
const mongoose = require('mongoose');
mongoose.connect(dbUrl, () => console.log("Database Connected"))
const postRoutes = require('./routes/post')
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
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

app.use('/*', (req, res) => {
    res.status(404).send('Page Not Found');
})


app.listen(PORT, () => console.log('Server is on PORT', PORT));