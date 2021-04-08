const mongoose = require('mongoose');

const uri = process.env.MONGO_URL;

async function connectDB() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(
    `- Conected to ${mongoose.connection.name} as ${mongoose.connection.user} on ${mongoose.connection.host}`
  );
}

module.exports = connectDB;
