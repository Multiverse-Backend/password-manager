import React, { useState, useEffect } from "react";


function GeneratePassword({ handleButtonClick }) {


    return (
        <>
            <button id="generate-password" className="btn btn-outline-light" onClick={handleButtonClick}>Generate Password</button><br/>
        </>
    )
}



export default GeneratePassword;