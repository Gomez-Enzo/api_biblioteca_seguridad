const mongoose = require("mongoose");
const Joi = require("joi");

mongoose.connect("mongodb://localhost:27017/biblioteca",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const libroShema = new mongoose.Schema({
    titulo: String,
    autor : String,
},{collection: 'libros'});

const libro = mongoose.model('libros', libroShema);

const validateLibro = (libros) => {
    const schema = Joi.object({
        titulo: Joi.string().max(15).default("Name Book"),
        autor: Joi.string().max(15).default("Name Author"),
    });

    return schema.validate(libros);
}
module.exports = {libro , validateLibro};
