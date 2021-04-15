const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(
    `- Conected to ${mongoose.connection.name} as ${mongoose.connection.user} on ${mongoose.connection.host}`
  );
}

module.exports = connectDB;
