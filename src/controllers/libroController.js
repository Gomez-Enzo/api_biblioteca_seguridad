const {libro, validateLibro} = require("../models/libro");
const validateLengthId = require('../utils/validateLengthId');

exports.getAllLibros =  async (req, res) => {
    try {
        const libros = await libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
};

exports.getLibroById = async (req, res, next) => {
    try {
        const  libroId = req.params.id;
        validateLengthId(libroId.length, 'El largo del id ingresado es incorrecto');
        const oneLibro = await libro.findById(libroId);

        if (!oneLibro) {
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;
        }

        res.json(oneLibro);

    } catch (error) {
        next(error);
    }
};

exports.createLibro = async (req, res, next) => {
    try {
        const result = validateLibro(req.body);

        if(result.error){
            const error = new Error(result.error.message);
            error.status = 400;
            throw error;
        }

        const nuevoLibro = new libro(result.value);
        await nuevoLibro.save();

        res.status(201).json({message: "Libro Agregado"});

    } catch (error) {
        next(error);
    }
};

exports.updateLibro = async (req, res, next) => {
    try {
        const libroId = req.params.id;

        validateLengthId(libroId.length, 'El largo del id ingresado es incorrecto');

        const result =  validateLibro(req.body);
        if(result.error){
            const error = new Error(result.error.message);
            error.status = 400;
            throw error;
        }

        const libroUpdate = await libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!libroUpdate) {
            const error = new Error('Libro no encontrado para actualizar');
            error.status = 404;
            throw error;
        }

        res.json(libroUpdate);
    } catch (error) {
        next(error);
    }
};

exports.deleteLibro = async (req, res, next) =>{
    try {
        const libroId = req.params.id;
        validateLengthId(libroId.length, 'El largo del id ingresado es incorrecto');
        const libroDetele = await libro.findByIdAndDelete(req.params.id);
        res.json({message: 'Libro eliminado correctamente'});
    } catch (error) {
        next (error);
    }

};



