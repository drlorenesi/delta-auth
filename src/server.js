const app = require('./app');
const connect = require('./config/db');

const env = process.env.ENTORNO.toUpperCase();
const port = process.env.PORT || 9000;

app.listen(port, async () => {
  console.log(`- Entorno: ${env}`);
  console.log(`- Servidor iniciado en puerto: ${port}`);
  await connect();
});
