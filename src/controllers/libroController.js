const {libro, validateLibro} = require("../models/libro");

exports.getAllLibros =  async (req, res) => {
    try {
        const libros = await libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los libros'});
    }
};

exports.getLibroById = async (req, res) => {
    try {
        const  libroId = req.params.id;
        const oneLibro = await libro.findById(libroId);

        if (!oneLibro) {
            res.status(404).json({error: 'Libro no encontrado'})
        }

        res.status(200).json(oneLibro);

    } catch (error) {
        res.status(500).json({error:'Error al obtener el libro'});
    }
};

exports.createLibro = async (req, res) => {
    try {
        const nuevoLibro =  await libro.create(req.body);
        await nuevoLibro.save();

        res.status(201).json(nuevoLibro);

    } catch (error) {
        res.status(500).json({error: 'Error al crear libro'});
    }
};

exports.updateLibro = async (req, res) => {
    try {
        const libroId = req.params.id;

        const libroUpdate = await libro.findByIdAndUpdate(libroId, req.body, {
            new: true,
        });
        if (!libroUpdate) {
            res.status(404).json({error: 'Libro no encontrado'});
        }

        res.status(200).json(libroUpdate);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el libro'});
    }
};

exports.deleteLibro = async (req, res) =>{
    try {
        const libroId = req.params.id;

        const libroDetele = await libro.findByIdAndDelete(libroId);
        res.status(200).json(libroDetele);
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el libro'});
    }

};



