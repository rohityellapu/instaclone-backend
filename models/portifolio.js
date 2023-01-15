const mongoose = require('mongoose');
const { Schema } = mongoose;

const portifolioSchema = new Schema({
    name: String,
    email: String,
    message: String
}, { timestamps: true })

const Portifolio = mongoose.model('Portifolio', portifolioSchema);

module.exports = Portifolio;
