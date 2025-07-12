import React from "react";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
<Outlet/>
    </div>
   
  )
}

export default Layout;
