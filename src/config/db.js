const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `- Conectado a ${mongoose.connection.name} en ${mongoose.connection.host}`
    );
    return mongoose.connection;
  } catch (error) {
    console.log(
      '- No fue posible conectarse a la Base de Datos:',
      error.message
    );
    return error;
  }
}

module.exports = connect;
