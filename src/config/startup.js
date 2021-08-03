module.exports = () => {
  if (!process.env.JWT_SIGNATURE) {
    console.error('FATAL ERROR: JWT_SIGNATURE is not defined.');
    process.exit(1);
  }
  if (!process.env.MONGO_URL) {
    console.error('FATAL ERROR: MONGO_URL is not defined.');
    process.exit(1);
  }
  if (!process.env.BASE_URL) {
    console.error('FATAL ERROR: BASE_URL is not defined.');
    process.exit(1);
  }
};
