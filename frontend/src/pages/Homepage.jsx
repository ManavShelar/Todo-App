import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import AddTodo from "../components/AddTodo.jsx";
import { NotebookPen, Pencil, Trash } from "lucide-react";
import axios from "axios";

const Homepage = () => {
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/todo", {
          withCredentials: true,
        });
        setTodos(res.data || []);
        
        const user = await axios.get("http://localhost:5001/api/auth/check", {
          withCredentials: true,
        });
        setName(user.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [editTodo, setEditTodo] = useState(null);

  const handleCheckboxChange = async (id, currentValue) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/todo/${id}/task-done`,
        { taskdone: !currentValue },
        { withCredentials: true }
      );
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, taskdone: !currentValue } : todo
        )
      );
    } catch (error) {
      console.error("Error updating taskdone:", error);
    }
  };  

  const handleAddOrUpdateTodo = async (title, description) => {
    try {
      if (title.trim() && description.trim()) {
        if (editTodo) {
          const res = await axios.put(
            `http://localhost:5001/api/todo/${editTodo._id}`,
            { title, description },
            { withCredentials: true }
          );
          setTodos(todos.map((t) => (t._id === editTodo._id ? res.data : t)));
          setEditTodo(null);
        } else {
          const res = await axios.post(
            "http://localhost:5001/api/todo",
            { title, description },
            { withCredentials: true }
          );
          setTodos([...todos, res.data]);
        }
      }
    } catch (error) {
      console.error("Error adding/updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/todo/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  };
  return (
    <>
      <Navbar />

      {todos.length === 0 ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
          <h1 className="text-center text-black text-2xl">
            {`Hello ${name.username} looks like you haven't added any todos yet. Click the Button to add.`}
          </h1>
        </div>
      ) : (
        <ul className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-black text-white px-4 py-3 rounded-lg shadow flex flex-col justify-between min-h-[150px] break-words overflow-hidden"
            >
              <div className="flex">
                <div className="w-80">
                  <h3 className="font-semibold text-lg">{todo.title}</h3>
                  <p className="text-gray-300 text-sm break-words">
                    {todo.description}
                  </p>
                </div>
                <div>
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="ripple-on"
                    data-ripple-dark="true"
                  >
                    <input
                      id="ripple-on"
                      type="checkbox"
                      checked={todo.taskdone || false}
                      onChange={() =>
                        handleCheckboxChange(todo._id, todo.taskdone)
                      }
                      className="peer relative h-5 w-5 bg-white cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-white checked:before:bg-slate-400 hover:before:opacity-10"
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-black opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <div>
                  <button
                    className="text-yellow-400 flex items-center cursor-pointer"
                    onClick={() => handleEditTodo(todo)}
                  >
                    <span className="text-xl m-2">Edit</span>
                    <Pencil className="transition-transform duration-200 hover:translate-x-1 hover:-translate-y-0.5" />
                  </button>
                </div>
                <button
                  className="text-red-400 flex items-center cursor-pointer"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  <span className="text-xl m-2">Delete</span>
                  <Trash className="transition-transform duration-200 hover:translate-x-1 hover:-translate-y-0.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AddTodo
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditTodo(null);
        }}
        onAdd={handleAddOrUpdateTodo}
        editTodo={editTodo}
      />

      <div className="fixed right-0 bottom-0 w-[50px] h-[50px] flex justify-center items-center bg-black rounded-4xl text-white py-4 border border-black m-3 hover:w-[60px] hover:h-[60px] transition-all">
        <button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <NotebookPen />
        </button>
      </div>
    </>
  );
};

export default Homepage;
