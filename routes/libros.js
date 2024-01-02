const express = require("express");
const route = express.Router();
const libro = require("../models/libro");

function validateLengthId(length, mensaje) {// funcion para verificar que el largo del id sea el correcto
    if(length != 24){
        const error = new Error(mensaje);
        error.status = 404;
        throw error;
    }
}

//obtener lista de libros
route.get("/", async (req, res, next) => {
    try {
        const libros = await libro.find();
        res.json(libros);
    } catch (error) {
        next(error);
    }
});

//obtener un Libro
route.get("/:id", async (req, res, next) => {
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
});

//agregar un libro
route.post("/", async (req, res, next) => {
    try {
        const nuevoLibro = new libro(req.body);
        await nuevoLibro.save();
        res.status(201).json(nuevoLibro);
    } catch (error) {
        next(error);
    }
});

//modificar caracteristica de libro
route.put("/:id", async (req, res, next) => {
    try {
        const libroId = req.params.id;
        validateLengthId(libroId.length, 'El largo del id ingresado es incorrecto');
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
});

//borrar un libro
route.delete("/:id", async (req, res, next) =>{
    try {
        const libroId = req.params.id;
        validateLengthId(libroId.length, 'El largo del id ingresado es incorrecto');
        const libroDetele = await libro.findByIdAndDelete(req.params.id);
        res.json({message: 'Libro eliminado correctamente'});
    } catch (error) {
        next (error);
    }

});

module.exports = route;
