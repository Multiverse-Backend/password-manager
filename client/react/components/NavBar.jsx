import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LogoutButton from "./Logout";
import LoginButton from "./Login";

function NavBar({ generatePasswordView }) {
    const { user, isAuthenticated } = useAuth0();


    return (
        <div className="flex-div">
            <h1>Password Manager</h1>
            
            <div id="right-nav">
            {isAuthenticated ?
                <>
                    <img id="avatar" src={user.picture} alt={user.name} />
                    <LogoutButton /><hr/>
                </>
            : !isAuthenticated && generatePasswordView && 
                <LoginButton />
            }
            </div>
        </div>
    )
}

export default NavBar;