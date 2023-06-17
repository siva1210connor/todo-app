import React from "react";
import TodoPage from "./components/TodoPage";
import Signin from "./components/Signin";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/todo"
          element={
            <Protected>
              <TodoPage />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
