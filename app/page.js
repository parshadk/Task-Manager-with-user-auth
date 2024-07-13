"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@material-tailwind/react";
import Todo from "../components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  
  const [todoData, setTodoData] = useState([]);


  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos); 
  }

 
  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    })
    
    toast.success(response.data.msg);
    fetchTodos()
  }

  
  const completeTodo = async (id) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId: id
      }
    })
    
    toast.success(response.data.msg);
   
    fetchTodos();
  }

  
  useEffect(() => {
    fetchTodos();
  }, []) 


  
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }));
    console.log(formData);
  }

  
  const submitHandler = async (e) => {
    e.preventDefault(); 

    try {
      
      const response = await axios.post('/api', formData);

      
      toast.success(response.data.msg);

      
      setFormData({
        title: "",
        description: "",
      });

      
      await fetchTodos();

    } catch (error) {
      
      toast.error("Error");
    }
  }

  return !session ? (
    <div className="flex min-h-screen flex-col items-center text-white justify-center p-24 bg-gray-900 ">
      <h1>Welcome!!!!!</h1>
      <h1>
        Register and then Login to use.
      </h1>
    </div>
  ) : (
    <>
      <ToastContainer theme="dark" />
      
      <form onSubmit={submitHandler} className="flex items-start flex-col gap-1 w-[80%] max-w-[600px] mx-auto">

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 border-s-red-600 w-full text-white bg-gray-900 mt-11"
          value={formData.title}
          onChange={onChangeHandler}
        />

        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 border-s-gray-400 w-full text-white bg-gray-900"
          value={formData.description}
          onChange={onChangeHandler}></textarea>

        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white rounded-md"
        >Add Todo</button>
      </form>

      {/* --- Table Todo --- */}
      <div className="relative overflow-x-auto w-[60%] mx-auto mt-[60px]">
        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {todoData.map((item, index) => {
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
