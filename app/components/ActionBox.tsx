"use client";
import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";

export default async function ActionBox({ id }) {
  const deletePost = async (id) => {
    console.log(id);
    const res = axios.delete("/api/controller/todo", {
      data: {
        todoId: id,
      },
    });
  };

  return (
    <div className="text-black text-xl flex gap-4">
      <AiOutlineEdit className="cursor-pointer" />
      <button onClick={deletePost}>
        <RiDeleteBin2Line className="cursor-pointer" />
      </button>
    </div>
  );
}