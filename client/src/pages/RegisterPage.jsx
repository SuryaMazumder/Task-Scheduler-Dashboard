import axios from "axios";
import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";

function RegisterPage() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error, setError] = useState('');
    const [emailValid, setEmailValid] = useState(true);

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function registerUser(ev){
      ev.preventDefault()

      try {
        await axios.post('/register',{
          name,
          email,
          password
        })
        setError('');
      } catch (err) {
 const backendMsg = err.response?.data?.message || 'Signup failed. Please try again later !!';
        setError(backendMsg);      }
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
        <h1 className="text-4xl text-center mb-6 text-black font-bold">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)}
            className="p-2 rounded border"
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => {
              setEmail(ev.target.value);
              setEmailValid(validateEmail(ev.target.value));
            }}
            className={`p-2 rounded border ${!emailValid ? 'border-red-500' : ''}`}
          />
          {!emailValid && (
            <span className="text-red-500 text-sm mb-2 block">Please enter a valid email address.</span>
          )}
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            className="p-2 rounded border"
          />
          <button className="primary bg-black text-white py-2 rounded hover:bg-gray-800">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
           Already have an account?{" "}
            <Link className="underline text-black" to={'/login'}>
             Sign in
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
  )
}

export default RegisterPage;
