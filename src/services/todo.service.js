const TodoModel = require("../models/todo.model");

// Add a new todo
const addTodo = async (title, description, status) => {
  const todo = new TodoModel({
    title,
    description,
    status,
  });
  const savedTodo = await todo.save();
  return savedTodo;
};

// Get all todos
const getAllTodos = async () => {
  const todos = await TodoModel.find();
  return todos;
};

// Get a todo by ID
const getTodoById = async (id) => {
  const todo = await TodoModel.findById(id);
  return todo;
};

// Update a todo
const updateTodo = async (id, title, description, status) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
  return updatedTodo;
};

// Delete a todo
const deleteTodo = async (id) => {
  const deletedTodo = await TodoModel.findByIdAndRemove(id);
  return deletedTodo;
};

const searchTodo = async (query) => {
  try {
    const searchResults = await TodoModel.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      },
    ]);

    return searchResults;
  } catch (error) {
    throw new Error("Error searching items");
  }
};

module.exports = {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  searchTodo,
  deleteTodo,
};
