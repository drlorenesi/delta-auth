const app = require('./app');
const connectDB = require('./config/db');

const env = process.env.NODE_ENV.toUpperCase();
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`- Environment: ${env}`);
  console.log(`- Server started on port: ${port}`);
  connectDB();
});
