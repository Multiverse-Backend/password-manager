import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Assets
import edit from "../../assets/edit-btn.png";
import trash from "../../assets/trash-btn.png";
import show from "../../assets/show.jpeg"
import hide from "../../assets/hide.jpeg"
import { Modal } from "react-bootstrap";


function Accounts({ userAccounts, fetchUserAccounts, handleDeleteClick, deleteAccount, showDelete, setShowDelete, currentID, setCurrentID }) {
    const { isAuthenticated, user } = useAuth0();

    // State to Show/Hide Credentials
    const [showCredentials, setShowCredentials] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    function toggleCredentials(accountId) {
        setShowCredentials(prevState => ({
            ...prevState,
            [accountId]: !prevState[accountId]
        }));
    }

    function handleClose() {
        setShowDelete(false);
        setCurrentID(null);
    }

    function confirmDelete(id){
        deleteAccount(id);
        setShowDelete(false);
        // fetchUserAccounts(user);
        setCurrentID(null);
    }

    // Refetch User Accounts after Account Deletion
    useEffect(() => {
        if (showDelete) {
            fetchUserAccounts(user);
        }
    }, [showDelete]);

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
                            <button id="delete-button" onClick={() => handleDeleteClick(account.id)}><img src={trash} alt="Delete"></img></button>
                        </div>
                    </div>
                    {/* If the Credential View State is True, display Account Credentials for selected Account */}                    
                    {showCredentials[account.id] && (
                        <>
                            <div className="card-body">
                                {/* If the Account has a Username, display Username and Email on the left */}
                                {account.username ? (
                                    <div id="left">
                                        <p className="card-text">Username: {account.username}</p>
                                        <p className="card-text">Email: {account.email}</p>
                                    </div>    
                                ) : (
                                    // If the Account does not have a Username, display Email on the left and Password on the right
                                    <>
                                        <p className="card-text">Email: {account.email}</p>
                                    </>
                                )}
                                <div id="right">
                                    {/* If Show Password is true, reveal the password */}
                                    {showPassword ? (
                                        <p className="card-text">Password: {account.password}</p>
                                    ) : (
                                        <p className="card-text">Password: ********</p>
                                    )}
                                    <div id="password-button-div">
                                        <button id="show-password" onClick={() => setShowPassword(!showPassword)}><img src={!showPassword ? show : hide}></img></button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                ))
            )}

            {/* If Delete Button is Clicked, display Delete Confirmation Modal */}
            
            {showDelete && (
                <Modal show={show} onHide={handleClose} size="sm" centered style={{color: 'black'}}>
                    <Modal.Header><h4>Delete Account</h4></Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this account?</p><br/>
                        {/* If there are User Accounts, find the account name of the current ID */}
                        <p><b>{userAccounts && userAccounts.find(account => account.id === currentID)?.account_name}</b></p><br/>
                        <p style={{color: 'red'}}>This action cannot be undone.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                        <button id="delete-account" onClick={() => confirmDelete(currentID)} className="btn btn-danger">Delete</button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default Accounts;
