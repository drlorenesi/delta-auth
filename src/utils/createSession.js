const { randomBytes } = require('crypto');

module.exports = async function (userId, req) {
  try {
    // Generate a session id
    const sessionId = randomBytes(43).toString('hex');
    // Retrieve connection information from request object
    const connectionInformation = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
    // Get 'sessions' collection from DB
    const { sessions } = require('../config/collections');
    // Insert new session into collection
    await sessions.insertOne({
      sessionId,
      userId,
      valid: true,
      userAgent: connectionInformation.userAgent,
      ip: connectionInformation.ip,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Return session id
    return sessionId;
  } catch (error) {
    throw new Error('Could not create session.');
  }
};
