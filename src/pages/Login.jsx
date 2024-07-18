// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hardcodedUsername = "admin";
  const hardcodedPassword = "Admin#1234";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === hardcodedUsername && password === hardcodedPassword) {
      setError("");
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };
  return (
    <>
      <div className="bg-[url(./assets/background.jpg)] bg-cover w-full h-screen flex justify-center items-center">
        <div className=" bg-white py-8 px-4 rounded-md">
          <h2 className="text-xl font-bold text-center">Login</h2>
          <p className="text-center text-gray-500 text-lg mb-4">
            Silahkan masukan username dan password terlebih dahulu
          </p>
          <form onSubmit={handleSubmit}>
            <p className="font-semibold mb-1">Username :</p>
            <label className="input input-bordered flex items-center gap-2 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Input Username"
              />
            </label>
            <p className="font-semibold mb-1">Password :</p>
            <label className="input input-bordered flex items-center gap-2 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Input Password"
              />
            </label>
            {error && (
              <p className="text-center text-red-600 text-lg font-bold ">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="bg-sky-900 text-white rounded-md py-2 px-8 font-semibold w-full my-5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
