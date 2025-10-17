import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newTodo = new Todo({
      userId: req.user._id,
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, description },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const taskDone = async (req, res) => {
  try {
    const { taskdone } = req.body
    const taskUpdated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { taskdone },
      { new: true }
    );
    if (!taskUpdated) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(taskUpdated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};