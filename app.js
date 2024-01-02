const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const routeLibros = require("./routes/libros")


app.use(express.json());
app.use('/libros', routeLibros);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});