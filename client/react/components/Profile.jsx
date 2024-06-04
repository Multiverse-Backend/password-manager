import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h1>Welcome Back, {user.given_name}!</h1>
        <img src={user.picture} alt={user.name} />
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;