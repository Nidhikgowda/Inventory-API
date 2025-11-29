const errorhandler = (err, req, res, next) => {
  console.error("Error:", err.message || err);

  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Something went wrong",
  });
};

export default errorhandler;