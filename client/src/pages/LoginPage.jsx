import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);

  async function loginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      console.log("Login response:", data);
      setUser(data);
      setRedirect(true);
      // Store manually in localStorage
localStorage.setItem('token', data.token);
console.log('Login successful, token stored:', data.token);
      setError('');
    } catch (err) {
      setError('Login failed. Please try again later !!');
    }
  }

  if (redirect && localStorage.getItem('token')) {
    return <Navigate to={'/account'} />;
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#0D1B2A",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0
        }}
      >
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl text-center mb-6 text-blue-700 font-bold">Task 365</h1>
          <form className="flex flex-col gap-4" onSubmit={loginSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="p-2 rounded border"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className="p-2 rounded border"
            />
            <button className="primary bg-black text-white py-2 rounded hover:bg-gray-800">
              Login
            </button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account?{" "}
              <Link className="underline text-black" to={'/register'}>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <div
          className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50"
        >
          {error}
        </div>
      )}
    </>
  );
}

export default LoginPage;
