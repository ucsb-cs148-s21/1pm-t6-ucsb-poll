import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated, isLoading } = useAuth0();


  if(isLoading){
      return <div>Loading...</div>;
  }

  return(

    (isAuthenticated) ? <LogoutButton /> : <LoginButton />



  );
};

export default AuthenticationButton;