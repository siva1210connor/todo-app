import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const style = {
  options: `cursor-pointer m-2 p-1`,
};

function Dropdown({ todo, toggleFavorite, toggleComplete, deleteTodo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {<BiDotsVerticalRounded />}
      </button>
      {isOpen && (
        <div className="absolute m-3 bg-white">
          <option
            className={style.options}
            onClick={() => toggleComplete(todo)}
            value="completed"
          >
            Completed
          </option>
          <option
            className={style.options}
            onClick={() => toggleFavorite(todo)}
            value="favorite"
          >
            Favorite
          </option>
          <option
            className={style.options}
            onClick={() => deleteTodo(todo.id)}
            value="delete"
          >
            Delete
          </option>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
