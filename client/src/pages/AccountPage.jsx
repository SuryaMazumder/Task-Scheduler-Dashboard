import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useLocation } from "react-router-dom";

function AccountPage() {
    const {pathname}=useLocation()
    let subpage =pathname.split('/')?.[2];

    if(subpage===undefined){
        subpage='profile'
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
    const {user,ready}=useContext(UserContext)
    if(!ready){
        return 'Loading.............Please Wait !!'
    }

    if( ready && !user){
        return <Navigate to={'/login'}/>
    }
  return (
  <>
   <nav className="w-full flex justify-around mt-8 gap-2">
    <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
    <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
    <Link className={linkClasses('places')} to={'/account/places'}>My Accomodation</Link>

   </nav>
   
  </>
  )
}

export default AccountPage;
