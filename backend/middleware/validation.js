const validateProduct = (req, res, next) => {
  const { name, category, state } = req.body;

  if (!name || !category || !state) {
    return res.status(400).json({
      message: 'Product name, category, and state are required',
    });
  }

  next();
};

module.exports = {
  validateProduct,
};
