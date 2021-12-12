// Uncomment to check if tests fail
// require('dotenv').config();
const startUp = require('../../config/startup');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

global.console = { error: jest.fn() };
startUp();

describe('Verificar variables de entorno en archivo ".env"', () => {
  // JWT_SIGNATURE
  it('- debería desplegar "ERROR TERMINAL: JWT_SIGNATURE no está definida." en la consola', () => {
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: JWT_SIGNATURE no está definida.'
    );
  });
  it('- debería terminar el proceso con código de salida 1 si no se encuentra "JWT_SIGNATURE"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
  // FRONTEND_URL
  it('- debería desplegar "ERROR TERMINAL: FRONTEND_URL no está definido." en la consola', () => {
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: FRONTEND_URL no está definido.'
    );
  });
  it('- debería terminar el proceso con código de salida 1 si no se encuentra "FRONTEND_URL"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
  // MONGO_URL
  it('- debería desplegar "ERROR TERMINAL: MONGO_URL no está definido." en la consola', () => {
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: MONGO_URL no está definido.'
    );
  });
  it('- debería terminar el proceso con código de salida 1 si no se encuentra "MONGO_URL"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
