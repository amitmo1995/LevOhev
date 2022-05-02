import React from "react";
import { Outlet, useParams } from "react-router-dom";

export function User(){
    let params=useParams();
    return <div>
        User page
        <p>userId= {params.userId}</p>
        </div>
    
}