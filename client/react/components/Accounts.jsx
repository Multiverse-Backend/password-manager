import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Assets
import edit from "../../assets/edit-btn.png";
import trash from "../../assets/trash-btn.png";


function Accounts({ userAccounts }) {
    const { isAuthenticated } = useAuth0();

    // State to Show/Hide Credentials
    const [showCredentials, setShowCredentials] = useState({});

    function toggleCredentials(accountId) {
        setShowCredentials(prevState => ({
            ...prevState,
            [accountId]: !prevState[accountId]
        }));
    }

    return (
        <>            
            {/* If User is Authenticated and has Accounts, map into cards to display */}
            {isAuthenticated && userAccounts.length > 0 && (
                userAccounts.map((account, idx) => (
                <div className="card" key={idx}>
                    <div className="card-header flex">
                        <div id="left">
                            <h5 className="card-title"><button id="account-name-button" onClick={() => toggleCredentials(account.id)}>{account.account_name}</button></h5>
                        </div>
                        <div id="right">
                            <button id="edit-button"><img src={edit} alt="Edit"></img></button>
                            <button id="delete-button"><img src={trash} alt="Delete"></img></button>
                        </div>
                    </div>
                    {/* If the Credential View State is True, display Account Credentials for selected Account */}                    
                    {showCredentials[account.id] && (
                        <div className="card-body">
                            <div id="left">
                                <p className="card-text">Username: {account.username}</p>
                                <p className="card-text">Email: {account.email}</p>
                            </div>
                            <div id="right">
                                <p className="card-text">Password: {account.password}</p>
                            </div>
                        </div>
                    )}
                </div>
                ))
            )}
        </>
    )
}

export default Accounts;
