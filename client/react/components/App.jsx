import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Import Assets
import logo from '../../assets/logo-white-split.png';
import bullets from '../../assets/lock-bullet.png';

// Import Components
import LoginButton from './Login';
import Profile from './Profile';
import NavBar from './NavBar';
import GeneratePassword from './GeneratePassword';

import axios from "axios";
import apiurl from "../api";


function App() {
    // Authentication Variables
    const { isAuthenticated } = useAuth0();

    // View State Variables
    const [generatePasswordView, setGeneratePasswordView] = useState(false);
    const [profileView, setProfileView] = useState(false);

    // Generated Password State
    const [generatedPassword, setGeneratedPassword] = useState(null);
    const [length, setLength] = useState(0);
    

    // Generate Password Function
    async function generatePassword(length) {
        try {
            const res = await axios.post(`${apiurl}/generate/`, {
                length: Number(length)
            });
            
            const data = res.data;
            console.log(data);
            setGeneratedPassword(data.password);
        } catch (error) {
            console.error("Error generating password", error);
        }
    }

    // Handle Generate Password Button Click
    function handleButtonClick() {
        setGeneratePasswordView(!generatePasswordView);
        setGeneratedPassword(null);
    }


    return (
        <div>
            <NavBar generatePasswordView={generatePasswordView}/>

            {/* Toggle Buttons based on Authentication */}
            {!isAuthenticated && !generatePasswordView ? 
            <>
                <div id='flex-container'>
                    <div className='body'>
                        {/* Brief Description of Password Manager Application */}
                        <p id='intro'>Securely store and generate 
                            unique passwords for your online accounts</p>

                        <div id='action-buttons'>
                            <LoginButton />
                            <GeneratePassword handleButtonClick={handleButtonClick} />
                        </div>
                    </div>

                    <div id='logo'>
                        <img id='lock-logo' src={logo} alt='logo' />
                    </div>
                </div>
            </>
                // If User is Authenticated, display Profile
                : isAuthenticated && !generatePasswordView ?
                    <Profile />
                // If Generate Password View is toggled, display Generate Password Data
                : generatePasswordView &&
                <>
                <div id='container'>
                    <h2>Generate a Password</h2><br/>
                    <div id="form-container">
                        <input type="number" placeholder="Enter Length" onChange={(e) => setLength(e.target.value)} /><br/>
                        <button id="submit" className="btn btn-outline-light" onClick={() => generatePassword(length)}>Submit</button><br/>
                    </div><br/>

                    {/* If Generated Password is NOT null, display the result */}
                    {generatedPassword !== null &&
                        <>
                            <div id="password-display" style={{display: 'block'}}>
                                <h5>Your Password:</h5>
                                <p id='output'>{generatedPassword}</p>
                            </div>
                        </>
                    }
<hr/><br/>
                    <h5>Secure Password Standards</h5><br/>
                    <div id='standards'>
                        <div id='overview'>
                            <p>It's important to create a secure password to protect your accounts. Here are some recommended standards to prevent unauthorized access</p>
                        </div>

                        <div id='standards-list'>
                        <ul>
                            <li style={{backgroundImage: `url(${bullets})`}}>At least 8 characters</li>
                            <li style={{backgroundImage: `url(${bullets})`}}>At least one uppercase letter</li>
                            <li style={{backgroundImage: `url(${bullets})`}}>At least one lowercase letter</li>
                            <li style={{backgroundImage: `url(${bullets})`}}>At least one number</li>
                            <li style={{backgroundImage: `url(${bullets})`}}>At least one special character</li>
                        </ul>
                        </div>
                    </div><br/>
                    <button id="back" className="btn btn-light" onClick={() => handleButtonClick()}>Go Back</button>
                </div>    
                </>
            }
        </div>
    );

}

export default App;
