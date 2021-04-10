module.exports = function (accessToken, refreshToken, res) {
  res
    .cookie('accessToken', accessToken, { httpOnly: true })
    .cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24, // cookie will be removed after 24 hours
      httpOnly: true,
    });
};
