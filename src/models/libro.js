const mongoose = require("mongoose");
const Joi = require("joi");

mongoose.connect('mongodb://localhost:27017/biblioteca',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const libroShema = new mongoose.Schema({
    titulo: String,
    autor : String,
},{collection: 'libros'});

const libro = mongoose.model('libros', libroShema);


const schema = Joi.object({
    id: Joi.string(),
    titulo: Joi.string().max(15).required(),
    autor: Joi.string().max(15).required(),
});

module.exports = {libro, schema};