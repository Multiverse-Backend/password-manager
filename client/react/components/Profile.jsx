import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import GeneratePassword from "./GeneratePassword";
import CreateAccount from "./CreateAccount";


function Profile({ handleButtonClick, fetchUserAccounts, userAccounts }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  useEffect(() => {
    fetchUserAccounts(user);
  }, [isAuthenticated]);


  return (
    isAuthenticated && (
      <div className="main-content">
        <h2 id="greeting">Welcome Back, {user.given_name}!</h2><br/>

      <div className="flex">
          <div id="accounts-data">
          <h3>My Accounts</h3>

            {userAccounts.length > 0 ? (
              <div id="my-accounts" style={{backgroundColor: 'rgba(255, 255, 255, 0.234)'}}>
              userAccounts.map((account, idx) => (
                <button key={idx} className="btn btn-light">
                  {account.name}
                </button>
              ))
              </div>
            ) : (
              <div id="my-accounts">
                <p>Create your first account now!</p><br/>
                <CreateAccount />
              </div>
            )}
        </div>

        <div id="actions">
          <h3>Actions</h3><br/>
          {userAccounts.length > 0 ? (
            <>
              <CreateAccount />
              <GeneratePassword handleButtonClick={handleButtonClick} />
            </>
          ) : (
            <GeneratePassword handleButtonClick={handleButtonClick} />
          )
          }
          </div>
      </div>
      
      </div>
    )
  );
}

export default Profile;