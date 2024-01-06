
const validateLengthId = (length, mensaje) => {
    if (length !=24) {
        const error = new Error(mensaje);
        error.status = 404;
        throw error;
    }
};

module.exports = validateLengthId;