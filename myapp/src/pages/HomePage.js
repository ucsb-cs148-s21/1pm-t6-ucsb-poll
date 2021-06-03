import React, { Component } from "react";
import NewVote from "../components/polls/NewVote";
import HomePagePolls from "../components/homePagePolls.js";
import { useAuth0 } from "@auth0/auth0-react";

//fix display for create a new poll

const HomePage = () => {
  const { isAuthenticated } = useAuth0();
    return (
      <div className="container">
        <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>
        <div class="jumbotron">
        <h1 class="display-4">Welcome to UCSB polls</h1>
        </div>
        <HomePagePolls />

        {isAuthenticated &&
          <div class="card">
            <div class="card-header">Create a New Poll</div>
            <NewVote />
          </div>
        }
        
      </div>
    );
  
}
export default HomePage; 
