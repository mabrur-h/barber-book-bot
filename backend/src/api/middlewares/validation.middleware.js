export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    next();
  } catch (error) {
    return res.status(400).json({
      error: {
        type: 'ValidationError',
        message: 'Invalid request data',
        details: error.errors,
      },
    });
  }
};
