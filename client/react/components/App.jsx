import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Import Assets
import logo from '../../assets/logo-white-split.png';

// Import Components
import LoginButton from './Login';
import Profile from './Profile';
import NavBar from './NavBar';
import GeneratePassword  from './GeneratePassword';
import GeneratePasswordForm  from './GeneratePasswordForm';
import CreateAccount from './CreateAccount';

import axios from "axios";
import apiurl from "../api";


function App() {
    // Authentication Variables
    const { isAuthenticated, user, isLoading } = useAuth0();

    // View State Variables
    const [generatePasswordView, setGeneratePasswordView] = useState(false);
    const [profileView, setProfileView] = useState(false);
    const [newAccountFormView, setNewAccountFormView] = useState(false);

    // Generated Password State
    const [generatedPassword, setGeneratedPassword] = useState(null);
    const [length, setLength] = useState(0);

    // User Accounts State
    const [userAccounts, setUserAccounts] = useState([]);

    // New Account Data State
    const [newAccountData, setNewAccountData] = useState({
        account_name: "",
        password: "",
        email: "",
        username: ""
    });
    

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

    // Fetch User Accounts Function
    async function fetchUserAccounts(user) {
        try {
            const res = await axios.post(`${apiurl}/accounts/user`, {
                    email: user.email
            });
            console.log(res.data);
            setUserAccounts(res.data);
        } catch (error) {
            console.error("Error fetching user accounts", error);
        }
    }

    // Submit New Account Function
    async function submitNewAccount(newAccountData) {
        try {
            const res = await axios.post(`${apiurl}/accounts/`, {
                account_name: newAccountData.account_name,
                password: newAccountData.password,
                email: newAccountData.email,
                username: newAccountData.username
            });
            fetchUserAccounts(user);
        } catch (error) {
            console.error("Error submitting new account", error);
        }
    }

    // Toggle Profile View
    useEffect(() => {
        if (isAuthenticated) {
            setProfileView(true);
            fetchUserAccounts(user);
        } else {
            setProfileView(false);
        }
    }
    , [isAuthenticated]);


    return (
        <div>
            <NavBar generatePasswordView={generatePasswordView}/>

            {/* If User is not Authenticated and not Generate Password View, display Sign Up & Generate Password Button */}
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
                // If User is Authenticated and not Generate PAssword View, display Profile
                : isAuthenticated && !generatePasswordView ?
                <>
                    <Profile handleButtonClick={handleButtonClick} fetchUserAccounts={fetchUserAccounts} userAccounts={userAccounts} setNewAccountFormView={setNewAccountFormView} newAccountFormView={newAccountFormView} setNewAccountData={setNewAccountData} newAccountData={newAccountData} submitNewAccount={submitNewAccount} />
                </>
                // If Generate Password View is toggled, display Generate Password Form
                : generatePasswordView &&
                <>
                <div id='container'>
                    <h2>Generate a Password</h2><br/>
                    <GeneratePasswordForm setLength={setLength} length={length} generatePassword={generatePassword} generatedPassword={generatedPassword} handleButtonClick={handleButtonClick} />
                </div>    
                </>
            }
        </div>
    );

}

export default App;
