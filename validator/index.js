exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty().isLength({ min: 3 });
  req
    .check("email", "Email is required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @");
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain atleast one digit");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
