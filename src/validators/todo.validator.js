const Joi = require("joi");

// Validation schema for the request body
const todoSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),
  status: Joi.string()
    .valid("active", "inactive", "pending")
    .default("pending"),
});

// Middleware function to validate the request body
const validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }
  next();
};

module.exports = validateTodo;
