module.exports = () => {
  if (!process.env.FIRMA_JWT) {
    console.error('ERROR TERMINAL: FIRMA_JWT no está definida.');
    process.exit(1);
  }
  if (!process.env.MONGO_URL) {
    console.error('ERROR TERMINAL: MONGO_URL no está definido.');
    process.exit(1);
  }
  if (!process.env.APP_URL) {
    console.error('ERROR TERMINAL: APP_URL no está definido.');
    process.exit(1);
  }
};
