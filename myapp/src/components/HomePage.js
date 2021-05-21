import React, { Component } from "react";
import NewVote from "./NewPolls/NewVote";
import HomePagePolls from "./homePagePolls.js";
import Searchfunc from "./Searchfunction.js";



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>
        {/* <NavigationBar displaytext="Navigation Bar" /> */}
        <div class="jumbotron">
        <h1 class="display-4">Welcome to UCSB polls</h1>
        </div>
        <HomePagePolls />
        <div class="card">
          <div class="card-header">Create a New Poll</div>
          <NewVote />
        </div>
        
      </div>
    );
  }
}
export default HomePage; 
