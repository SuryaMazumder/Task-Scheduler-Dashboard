import axios from "axios";
import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";

function LoginPage() {
   
  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState(false)

  function loginApp(ev){
    ev.preventDefault()

    try{
      axios.post('/login',{
        email,
        password
      })
      setRedirect(true)
    }catch(err){
      alert('Login failed.Please try again later !!')
    }

  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="mt-4 grow justify-around items-center">
     <div className="mb-64">
    <h1 className="text-4xl text-center mb-4">Login</h1>
    

        <form className="max-w-md mx-auto" onSubmit={loginApp}> 
        <input type="email" placeholder='your@email.com' value={email} onChange={ev=>setEmail(ev.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)}/>
        <button className="primary" >Login</button>
        <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
        </div>
    </div>
  )
}

export default LoginPage;
