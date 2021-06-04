import React, { Component } from "react";
import Profile from "../components/profilePageComponent.js";



const ProfilePage = ({ match }) => {
  const {
      params: { userid },
  } = match;
  return (
    <div className="container">
        <div class="card">
        <div class="card-header"><h2>Profile Page</h2></div>
        <Profile userID= {userid} />
      </div>
    </div>
  );


}

export default ProfilePage; 
