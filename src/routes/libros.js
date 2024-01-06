const express = require("express");
const {requiredScopes} = require("express-oauth2-jwt-bearer");
const { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro } = require("../controllers/libroController");
const route = express.Router();

//obtener lista de libros
route.get("/", requiredScopes("read:libros"),getAllLibros);

//obtener un Libro
route.get("/:id", requiredScopes("read:libros"), getLibroById);

//agregar un libro
route.post("/", requiredScopes("write:libros"), createLibro);

//modificar caracteristica de libro
route.put("/:id", requiredScopes("write:libros"), updateLibro);

//borrar un libro
route.delete("/:id", requiredScopes("write:libros"), deleteLibro);

module.exports = route;
