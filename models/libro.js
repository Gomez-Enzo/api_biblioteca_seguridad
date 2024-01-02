const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/biblioteca",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const libroShema = new mongoose.Schema({
    titulo: String,
    autor : String,
},{collection: 'libros'});

const libro = mongoose.model('libros', libroShema);

module.exports = libro;
