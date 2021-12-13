import React from "react";

export default function Home({logout}){

    return(
        <div>
           <h1>welcom</h1>
           <button type='submit' onClick={()=>logout()}>Logout</button>
        </div>
    )
}
