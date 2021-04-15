const { nanoid } = require('nanoid');
const Session = require('../models/session');

module.exports = async function (userId, req) {
  // Generate a session id
  const sessionId = nanoid();
  // Retrieve connection information from request object
  const connectionInformation = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };
  // Create session document and save
  let session = new Session({
    sessionId,
    userId,
    userAgent: connectionInformation.userAgent,
    ip: connectionInformation.ip,
  });
  session = await session.save();
  // Return session id
  return sessionId;
};
