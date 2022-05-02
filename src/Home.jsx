import React from "react";
import { Outlet } from "react-router-dom";

export function Home(){
    return <div>
        Home page
        <Outlet />
        </div>
    
}