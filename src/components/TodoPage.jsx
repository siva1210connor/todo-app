import React, { useEffect, useState } from "react";
import Todo from "./Todo.jsx";
import { UserAuth } from "../context/AuthContext.js";

import { db } from "../firebase.js";
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const style = {
  bg: `h-screen p-4`,
  heading: "text-3xl font-bold text-gray-800 text-center p-4 m-7",
  container:
    "flex place-content-evenly mt-20 bg-slate-100 max-w-[1000px] w-full m-auto shadow-xl p-4",
  form: "flex flex-col justify-self-center ",
  input: "border outline-0 mt-4 p-4 ",
  button: `border p-4 mt-8 bg-cyan-500 hover:bg-cyan-600 text-slate-100 cursor-pointer`,
  logout: `border p-4 mt-8 bg-red-500 hover:bg-red-600 text-slate-100 cursor-pointer text-center`,
  section: `w-[400px]`,
  search: `p-2`,
  vl: `inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50 `,
};

function TodoPage() {
  const { user, logOut } = UserAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (title === "" && desc === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      title: title,
      desc: desc,
      completed: false,
      favorite: false,
    });
    setTitle("");
    setDesc("");
  };
  //read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });

    return () => unSubscribe;
  }, []);
  //update todo from firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  const toggleFavorite = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      favorite: !todo.favorite,
    });
  };
  //delete todo from firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  //search todo by title
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  //completed titles

  const filterComplete = () => {
    const completeArr = query(
      collection(db, "todos"),
      where("completed", "==", true)
    );
    setTodos(completeArr);
  };

  //Handle signout
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.section}>
          <h3 className={style.heading}>Todo</h3>
          <p>welcome, {user?.displayName}</p>
          <form onSubmit={createTodo} className={style.form}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={style.input}
              type="text"
              placeholder="Title"
            />
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={style.input}
              type="text"
              placeholder="Description"
            />
            <input className={style.button} type="submit" value="Add" />
            {user?.displayName ? (
              <button onClick={handleSignOut} className={style.logout}>
                Sign Out
              </button>
            ) : (
              <Link className={style.logout} to="/">
                Sign Out
              </Link>
            )}
            {/* <button className={style.logout}>
              <Link to="/">Sign Out</Link>
            </button> */}
          </form>
        </div>
        <div className={style.vl}></div>
        <div className={style.section}>
          <h3 className={style.heading}>Todo List</h3>
          <div className="flex place-content-between">
            <input
              className={style.search}
              onChange={handleChange}
              type="text"
              placeholder="search by title"
            />
            <select className="p-4" name="" id="">
              <option value="all">All</option>
              <option onClick={filterComplete} value="completed">
                Completed
              </option>
              <option value="favorite">Favourite</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
          {todos.length < 1 ? null : (
            <p className="m-7">{`You have ${todos.length} todos`}</p>
          )}

          <ul className="mt-7">
            {todos.map((todo) => (
              <Todo
                todo={todo}
                toggleComplete={toggleComplete}
                toggleFavorite={toggleFavorite}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
