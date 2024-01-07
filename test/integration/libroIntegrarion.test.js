const request = require("supertest");
const app = require("../../src/app");
const {libro} = require ("../../src/models/libro");

jest.mock("../../src/models/libro");

jest.mock("express-oauth2-jwt-bearer", () => {
    return {
        auth: jest.fn().mockImplementation(() => (req, res, next) =>
            next()),
        requiredScopes: jest.fn().mockImplementation(() => (req, res, next) => next()),
    };
});

describe("Libro API", () => {

    test("GET /libros debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: "1", title: "Libro 1" },
            { id: "2", title: "Libro 2" },
        ];

        libro.find.mockResolvedValue(mockLibros);
        const response = await request(app).get("/libros");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockLibros);
        expect(libro.find).toHaveBeenCalledTimes(1);
    });

    test("POST /libros debería crear un nuevo libro", async () => {
        const libroCreado = {
            titulo: "Nuevo Libro", autor: "Juan Perez"
        };
        const libroMock = {
            ...libroCreado,
            save: () => { }
        };

        libro.create.mockResolvedValue(libroMock);
        const response = await
            request(app).post("/libros").send(libroMock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(libroCreado);
        expect(libro.create).toHaveBeenCalledTimes(1);
        expect(libro.create).toHaveBeenCalledWith(libroCreado);
    });
});