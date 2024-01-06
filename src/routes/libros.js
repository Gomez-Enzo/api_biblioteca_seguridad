const express = require("express");
const {requiredScopes} = require("express-oauth2-jwt-bearer");
const { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro } = require("../controllers/libroController");
const route = express.Router();

//obtener lista de libros
route.get("/", requiredScopes("read:productos"),getAllLibros);

//obtener un Libro
route.get("/:id", requiredScopes("read:estudiantes"), getLibroById);

//agregar un libro
route.post("/", requiredScopes("write:productos"), createLibro);

//modificar caracteristica de libro
route.put("/:id", requiredScopes("write:productos"), updateLibro);

//borrar un libro
route.delete("/:id", requiredScopes("write:productos"), deleteLibro);

module.exports = route;
