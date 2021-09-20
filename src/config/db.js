const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.URL_MONGO);
  console.log(
    `- Conectado a ${mongoose.connection.name} en ${mongoose.connection.host}`
  );
}

module.exports = connectDB;
