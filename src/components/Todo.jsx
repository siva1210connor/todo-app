import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import Dropdown from "./Dropdown";
import { db } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const style = {
  li: `flex justify-between p-4 mt-6`,
  title: `text-xl`,
  desc: `bg-slate-100 text-sm mt-4`,
};

function Todo({ todo, toggleComplete, toggleFavorite, deleteTodo }) {
  const { title, desc, completed, favorite } = todo;

  return (
    <>
      <li className={style.li}>
        <div className="todo">
          <h3 className={style.title}>{title}</h3>
          <div className="flex m-2">
            {completed ? <AiOutlineCheck /> : ""}
            {favorite ? <MdOutlineFavorite /> : ""}
          </div>
          <p className={style.desc}>{desc}</p>
        </div>
        <Dropdown
          todo={todo}
          toggleComplete={toggleComplete}
          toggleFavorite={toggleFavorite}
          deleteTodo={deleteTodo}
        />
      </li>
      <hr className={style.hr} />
    </>
  );
}

export default Todo;
