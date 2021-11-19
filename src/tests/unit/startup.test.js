// Uncomment to check if tests fail
// require('dotenv').config();
const startUp = require('../../config/startup');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

global.console = { error: jest.fn() };
startUp();

describe('Verificar variables de entorno en archivo ".env"', () => {
  // FIRMA_JWT
  it('- debería desplegar "ERROR TERMINAL: FIRMA_JWT no está definida." en la consola', () => {
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: FIRMA_JWT no está definida.'
    );
  });
  it('- debería terminar el proceso con código de salida 1 si no se encuentra "FIRMA_JWT"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
  // URL_APP
  it('- debería desplegar "ERROR TERMINAL: URL_APP no está definido." en la consola', () => {
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: URL_APP no está definido.'
    );
  });
  it('- debería terminar el proceso con código de salida 1 si no se encuentra "URL_APP"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
  // URL_MONGO
  it('- debería desplegar "ERROR TERMINAL: URL_MONGO no está definido." en la consola', () => {
    expect(console.error).toHaveBeenCalledWith(
      'ERROR TERMINAL: URL_MONGO no está definido.'
    );
  });
  it('- debería terminar el proceso con código de salida 1 si no se encuentra "URL_MONGO"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
