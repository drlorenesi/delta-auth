const jwt = require('jsonwebtoken');
const JWTSignature = process.env.JWT_SIGNATURE;
const getUserInfo = require('../utils/getUserInfo');

module.exports = (req, res, next) => {
  if (req?.cookies?.accessToken) {
    // Decode access token
    const decoded = jwt.verify(req.cookies.accessToken, JWTSignature);
    console.log(decoded);
    next();
  } else if (req?.cookies?.refreshToken) {
    // Decode access token
    const decoded = jwt.verify(req.cookies.refreshToken, JWTSignature);
    console.log(decoded);
    next();
  } else {
    return res
      .status(401)
      .send({ message: 'Access denied. No token provided.' });
  }

  // try {
  //   const decoded = jwt.verify(token, process.env.jwtPrivateKey);
  //   // Check to see if token is expired
  //   if (decoded.exp > new Date())
  //     return res.status(401).send('Access denied. Token expired.');
  //   req.user = decoded;
  //   next();
  // } catch (ex) {
  //   res.status(400).send('Invalid token.');
  // }
};
