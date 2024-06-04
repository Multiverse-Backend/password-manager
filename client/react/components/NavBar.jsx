import React, { useState, useEffect } from "react";

// Import Components
import LogoutButton from "./Logout";

function NavBar() {

    return (
        <div className="flex-div">
            <h1>Password Manager</h1>
            <LogoutButton /><hr/>
        </div>
    )
}

export default NavBar;