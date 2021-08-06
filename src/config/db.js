const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log(
    `- Conectado a ${mongoose.connection.name} en ${mongoose.connection.host} como ${mongoose.connection.user}`
  );
}

module.exports = connectDB;
