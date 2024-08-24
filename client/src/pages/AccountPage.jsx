import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

function AccountPage() {
    const [redirect,setRedirect]=useState(null)
    const {user,ready,setUser}=useContext(UserContext)
    const {pathname}=useLocation()
    let subpage =pathname.split('/')?.[2];

    if(subpage===undefined){
        subpage='profile'
    }

    async function logout(){
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }
    function linkClasses(type=null){
           let classes='inline-flex gap-1 py-2 px-6 rounded-full';
           if(type===subpage){
            classes += ' bg-primary text-white';
           }else{

            classes+='bg-gray-200'
           }
           return classes
    }
   
    if(!ready){
        return 'Loading.............Please Wait !!'
    }

    if( ready && !user){
        return <Navigate to={'/login'}/>
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
   
  return (
  <>
   <nav className="w-full flex justify-around mt-8 gap-2">
    <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
    <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
    <Link className={linkClasses('places')} to={'/account/places'}>My Accomodation</Link>
<button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
   </nav>
   {subpage === 'places' && (
        <PlacesPage />
      )}
  </>
  )
}

export default AccountPage;
