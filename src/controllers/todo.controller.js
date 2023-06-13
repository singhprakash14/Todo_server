const httpStatus = require("http-status");
const todoService = require("../services/todo.service");

// Add a new todo
const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const savedTodo = await todoService.addTodo(title, description, status);
    res.status(httpStatus.CREATED).json(savedTodo);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(httpStatus.OK).json(todos);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Get a todo by ID
const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    res.status(httpStatus.OK).json(todo);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTodo = await todoService.updateTodo(
      req.params.id,
      title,
      description,
      status
    );
    if (!updatedTodo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    res.status(httpStatus.OK).json(updatedTodo);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id);
    if (!deletedTodo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    res.status(httpStatus.OK).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Search for todos
const searchTodo = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(httpStatus.BAD_REQUEST).send({ data: [] });
    }
    const searchResults = await todoService.searchTodo(query);
    if (!searchResults || searchResults.length===0) {
      return res.status(httpStatus.NOT_FOUND).send({ data: [] });
    }
    res.json(searchResults);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  searchTodo,
};
