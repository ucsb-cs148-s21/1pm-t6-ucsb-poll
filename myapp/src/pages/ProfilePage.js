import React, { Component } from "react";
import Profile from "../components/profilePageComponent.js";

class ProfilePage extends Component {

  render() {
    return (
      <div className="container">
          <div class="card">
          <div class="card-header"><h2>Profile Page</h2></div>
          <Profile />
        </div>
      </div>
    );
  }
}
export default ProfilePage; 
