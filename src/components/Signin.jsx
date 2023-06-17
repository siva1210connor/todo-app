import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const style = {
  bg: `h-screen p-4`,
  container: `grid place-content-evenly mt-20 bg-slate-100 max-w-[1000px] w-full m-auto shadow-xl p-4 h-[500px]`,
};

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/todo");
    }
  }, [user]);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className="text-3xl">Sign in</h3>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;
