const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const validateTodo = require("../validators/todo.validator");

router
  .route("/todos")
  .get(todoController.getAllTodos)
  .post(validateTodo,todoController.addTodo);

router
  .route("/todos/:id")
  .get(todoController.getTodoById)
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo);


  // Search route
router.get("/search", todoController.searchTodo);
module.exports = router;
