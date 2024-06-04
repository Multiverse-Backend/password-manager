import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Import Assets
import logo from '../../assets/logo-white-split.png';

// Import Components
import LoginButton from './Login';
import LogoutButton from './Logout';
import Profile from './Profile';
import NavBar from './NavBar';
import GeneratePassword from './GeneratePassword';

function App() {
    const { isAuthenticated } = useAuth0();
    


    return (
        <div>

            {/* Toggle Buttons based on Authentication */}
            {!isAuthenticated ? 
            <>
                <h1>Password Manager</h1><br/>

                <div id='flex-container'>
                    <div className='body'>
                        {/* Brief Description of Password Manager Application */}
                        <p id='intro'>Securely store and generate 
                            unique passwords for your online accounts</p>

                        <div id='action-buttons'>
                            <LoginButton />
                            <GeneratePassword />
                        </div>
                    </div>

                    <div id='logo'>
                        <img id='lock-logo' src={logo} alt='logo' />
                    </div>
                </div>
            </>
                :
                <>
                    <NavBar />
                    <Profile />
                </>
            }
        </div>
    );

}

export default App;
