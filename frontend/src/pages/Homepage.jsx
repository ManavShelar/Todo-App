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
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const [todos, setTodos] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

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
 return(
  <>
  <Navbar />

  {todos.length === 0 ? (
    <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
      <h1 className="text-center text-black text-2xl">
        No todos yet. Click the Button to Add.
      </h1>
    </div>
  ) : (
    <ul className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="bg-black text-white px-4 py-3 rounded-lg shadow flex flex-col justify-between min-h-[150px] break-words overflow-hidden"
        >
          <div className="w-80">
            <input 
                type="checkbox"
                className="relative right-0" 
              />        
            <h3 className="font-semibold text-lg">{todo.title}</h3> 
            <p className="text-gray-300 text-sm break-words">{todo.description}</p>
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
 )
};

export default Homepage;
