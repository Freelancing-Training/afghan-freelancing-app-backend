const attachImageToBody = (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.path.split('\\')[2];
  }
  return next();
};

module.exports = {
  attachImageToBody,
};
