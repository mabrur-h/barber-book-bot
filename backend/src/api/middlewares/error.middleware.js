export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.type === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  if (err.type === 'NotFoundError') {
    return res.status(404).json({
      error: {
        message: err.message,
      },
    });
  }

  return res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
};
