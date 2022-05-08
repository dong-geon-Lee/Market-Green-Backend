const error = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  const foundError = new Error(`Not found - ${req.originalUrl}`);

  res.status(404);

  next(foundError);
};

module.exports = { error, notFound };
