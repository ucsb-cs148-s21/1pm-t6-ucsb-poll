import React, { Component } from "react";
import NewVote from "./NewPolls/NewVote";


//import './index.css'
//import './App.css'

class ProfilePage extends Component {
  render() {
    return (
      <div className="container">
        <div class="card">
          <div class="card-header">Create a New Poll</div>
          <NewVote />
        </div>
      </div>
    );
  }
}
export default ProfilePage; 
