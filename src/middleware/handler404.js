const handler404 = (req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
};

export default handler404;