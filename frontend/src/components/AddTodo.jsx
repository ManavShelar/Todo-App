import React, { useState } from "react";
import { useEffect } from "react";

const AddTodo = ({ isOpen, onClose, onAdd, editTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTodoTitle(editTodo.title);
      setTodoDescription(editTodo.description);
    } else {
      setTodoTitle("");
      setTodoDescription("");
    }
  }, [editTodo, isOpen]);

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[6px] flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative border-2 border-black">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editTodo ? "Edit Todo" : "Add New Todo"}
          </h2>

          <label className="block mb-2 text-gray-700">Enter Title</label>
          <input
            type="text"
            value={todoTitle || ""}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="Enter your task title"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 text-gray-700">Enter Description</label>
          <input
            type="text"
            value={todoDescription || ""}
            onChange={(e) => setTodoDescription(e.target.value)}
            placeholder="Enter your task description"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onAdd(todoTitle, todoDescription);
                if (!editTodo) {
                  setTodoTitle("");
                  setTodoDescription("");
                }
                onClose();
              }}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              {editTodo ? "Update" : "Add"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            ✖
          </button>
        </div>
      </div>
    );
  }
};

export default AddTodo;
