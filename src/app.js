const express = require("express");

require('dotenv').config();

const errorHandler = require("./middlewares/errorHandler");
const routeLibros = require("./routes/libros");
const {auth} = require("express-oauth2-jwt-bearer");


const autenticacion = auth({
    audience: process.env.OAUTH_AUDIENCE,
    issuerBaseURL: process.env.OAUTH_URL,
    tokenSigningAlg: "RS256",
});
    
const app = express();
app.use(express.json());

app.use('/libros', autenticacion, routeLibros);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});