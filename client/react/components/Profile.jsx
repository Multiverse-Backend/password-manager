import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import GeneratePassword from "./GeneratePassword";
import CreateAccount from "./CreateAccount";
import Accounts from "./Accounts";


function Profile({ handleButtonClick, fetchUserAccounts, userAccounts, setNewAccountFormView, newAccountFormView, newAccountData, setNewAccountData, submitNewAccount, handleDeleteClick, showDelete, setShowDelete, deleteAccount, currentID, setCurrentID }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  useEffect(() => {
    {isLoading &&
      fetchUserAccounts(user);
      console.log(user);
    }
  }, [isLoading]);


  return (
    isAuthenticated && (
      <div className="main-content">
        <h2 id="greeting">Welcome Back, {user.given_name ? user.given_name : user.nickname}!</h2><br/>

      <div className="flex">
          <div id="accounts-data">
            <h3>My Accounts</h3>
              <div id="my-accounts">
                {userAccounts.length > 0 ? (
                  <Accounts userAccounts={userAccounts} fetchUserAccounts={fetchUserAccounts} handleDeleteClick={handleDeleteClick} deleteAccount={deleteAccount} showDelete={showDelete} setShowDelete={setShowDelete} currentID={currentID} setCurrentID={setCurrentID} />
                ) : (
                  <>
                    <p>Create your first account now!</p><br/>
                    <CreateAccount newAccountFormView={newAccountFormView} setNewAccountFormView={setNewAccountFormView} newAccountData={newAccountData} setNewAccountData={setNewAccountData} submitNewAccount={submitNewAccount} />
                  </>
                )}
              </div>
          </div>

        <div id="actions">
          <h3>Actions</h3><br/>
          <div id="action-div">
          {userAccounts.length > 0 ? (
            <>
              <CreateAccount newAccountFormView={newAccountFormView} setNewAccountFormView={setNewAccountFormView} newAccountData={newAccountData} setNewAccountData={setNewAccountData} submitNewAccount={submitNewAccount} /><br/>
              <GeneratePassword handleButtonClick={handleButtonClick} />
            </>
          ) : (
              <GeneratePassword handleButtonClick={handleButtonClick} />
            )
          }
          </div>
          </div>
      </div>
      
      </div>
    )
  );
}

export default Profile;