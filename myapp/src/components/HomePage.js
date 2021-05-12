import React, { Component } from "react";
import NavigationBar from "./NavigationBar.js";
import NewVote from "./NewPolls/NewVote";
import Apoll from "./homePagePolls.js";
import PollResults from "./NewPolls/NewPollResults.js"

//import './index.css'
//import './App.css'

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
        {/* <NavigationBar displaytext="Navigation Bar" /> */}

        <div class="jumbotron">
        <h1 class="display-4">Welcome to UCSB polls</h1>
        </div>
        <Apoll />
        <div class="card">
          <div class="card-header">Create a New Poll</div>
          <NewVote />
        </div>
        
      </div>
    );
  }
}
export default HomePage; 
