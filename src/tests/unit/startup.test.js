// Uncomment to check if tests fail
// require('dotenv').config();
const startUp = require('../../config/startup');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

global.console = { error: jest.fn() };
startUp();

describe('Verify environment variables in ".env" file', () => {
  it('- should display "FATAL ERROR: JWT_SIGNATURE is not defined." on console', () => {
    expect(console.error).toHaveBeenCalledWith(
      'FATAL ERROR: JWT_SIGNATURE is not defined.'
    );
  });
  it('- should exit process with exit code 1 if "JWT_SIGNATURE" does not exists in ".env"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
  it('- should display "FATAL ERROR: MONGO_URL is not defined." on console', () => {
    expect(console.error).toHaveBeenCalledWith(
      'FATAL ERROR: MONGO_URL is not defined.'
    );
  });
  it('- should exit process with exit code 1 if "MONGO_URL" does not exists in ".env"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
  it('- should display "FATAL ERROR: BASE_URL is not defined." on console', () => {
    expect(console.error).toHaveBeenCalledWith(
      'FATAL ERROR: BASE_URL is not defined.'
    );
  });
  it('- should exit process with exit code 1 if "BASE_URL" does not exists in ".env"', () => {
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
