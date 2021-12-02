const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `- Conectado a ${mongoose.connection.name} en ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log('Could not connect to MongoDB:', error);
  }
}

module.exports = connectDB;
