const {getAllLibros} = require("../../src/controllers/libroController");
const libroModel = require("../../src/models/libro");
jest.mock("../../src/models/libro")


describe("Libro Controller", () => {
    
    let mockRes ={
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    
    test("getLibros debería obtener todos los libros", async () => {
        const mockLibros = [
            { id: "1", title: "Libro 1" },
            { id: "2", title: "Libro 2" },
        ];
        libroModel.find.mockResolvedValue(mockLibros);
        const mockReq = {};
        await getAllLibros(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibros);
    });
});
