const {
    getAllLibros, 
    createLibro, 
    updateLibro, 
    deleteLibro, 
    getLibroById
} = require("../../src/controllers/libroController");

const {libro} = require("../../src/models/libro");

jest.mock("../../src/models/libro")


describe("Libro Controller", () => {
    
    let mockRes;
    
    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    
        
    test("getLibros debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: "1", title: "Libro 1" },
            { id: "2", title: "Libro 2" },
        ];
        
        libro.find.mockResolvedValue(mockLibros);

        const mockReq = {};

        await getAllLibros(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibros);
    });

    test("getLibroById debería obtener un libro", async () => {
        const mockLibro = {
            id: "1", titulo: "Libro Encontrado", autor:
                "Juan Perez"
        };

        libro.findById.mockResolvedValue(mockLibro);

        const mockReq = { params: { id: "1" } };

        await getLibroById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });

    test("createLibro debería crear un nuevo libro", async () => {
        const mockLibro = {
            titulo: "Nuevo Libro", autor: "Juan Perez"
        };
        mockLibro.save = () => { };

        libro.create.mockResolvedValue(mockLibro);

        const mockReq = { body: mockLibro };
        await createLibro(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });

    test("updateLibro debería actualizar un libro existente", async () => {
        const libroId = '1';

        const libroActualizado = {
            titulo: 'book update', autor:
                'Author update'
        };

        const libroActualizadoMock = { _id: libroId, ...libroActualizado };

        libro.findByIdAndUpdate.mockResolvedValue(libroActualizadoMock);

        const mockReq = { params: { id: libroId }, body: libroActualizado };
        await updateLibro(mockReq, mockRes);

        expect(libro.findByIdAndUpdate).toHaveBeenCalledWith(libroId,
            libroActualizado, { new: true });

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(libroActualizadoMock);
    });

    test("updateLibro debería devolver un error si el libro no existe",
        async () => {
            libro.findByIdAndUpdate.mockResolvedValue(null);
            const mockReq = {
                params: { id: "99" },
                body: { titulo: "Libro Actualizado" },
            };
            await updateLibro(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Libro no encontrado"
            });
        }
    );

    test("deleteLibro debería eliminar un libro existente", async () => {
        const mockLibroEliminado = {
            titulo: 'Libro Eliminado', autor:
                'Autor Eliminado'
        };

        libro.findByIdAndDelete.mockResolvedValue(mockLibroEliminado);

        const mockReq = { params: { id: "1" } };
        await deleteLibro(mockReq, mockRes);
        
        expect(libro.findByIdAndDelete).toHaveBeenCalledWith(mockReq.params
            .id);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibroEliminado);
    });
        
});
