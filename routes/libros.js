const express = require("express");
const route = express.Router();
const {libro, validateLibro} = require("../models/libro");
const {requiredScopes} = require("express-oauth2-jwt-bearer");

function validateLengthId(length, mensaje) {// funcion para verificar que el largo del id sea el correcto
    if(length != 24){
        const error = new Error(mensaje);
        error.status = 404;
        throw error;
    }
}

//obtener lista de libros
route.get("/", requiredScopes("read:productos"), async (req, res, next) => {
    try {
        const libros = await libro.find();
        res.json(libros);
    } catch (error) {
        next(error);
    }
});

//obtener un Libro
route.get("/:id", requiredScopes("read:estudiantes"), async (req, res, next) => {
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
route.post("/", requiredScopes("write:productos"), async (req, res, next) => {
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
});

//modificar caracteristica de libro
route.put("/:id", requiredScopes("write:productos"), async (req, res, next) => {
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
});

//borrar un libro
route.delete("/:id", requiredScopes("write:productos"), async (req, res, next) =>{
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
