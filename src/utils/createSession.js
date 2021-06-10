const { nanoid } = require('nanoid');
const Session = require('../models/session');
const User = require('../models/user');

module.exports = async function (userId, req) {
  // Get User Info
  const userInfo = await User.findById(userId);
  // Generate a session id
  const sessionId = nanoid();
  // Retrieve connection information from request object
  const connectionInformation = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  };
  // Create new session document and save to DB
  let session = new Session({
    sessionId,
    user: {
      _id: userInfo._id,
      nombre: userInfo.nombre,
      apellido: userInfo.apellido,
      email: userInfo.email,
      accessLevel: userInfo.accessLevel,
    },
    userAgent: connectionInformation.userAgent,
    ip: connectionInformation.ip,
  });
  session = await session.save();
  // Return session id
  return sessionId;
};
