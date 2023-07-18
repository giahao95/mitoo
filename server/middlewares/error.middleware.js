const errorHandle = (err, req, res, next) => {
  res.status(res.statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { errorHandle };
