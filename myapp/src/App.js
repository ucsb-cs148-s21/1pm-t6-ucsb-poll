import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar.js";
import DemoPoll from "./components/poll/DemoPoll";
import NewVote from "./components/NewPolls/NewVote";
import Apoll from "./components/homePagePolls.js";
import PollResults from "./components/NewPolls/NewPollResults.js"

import './index.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }


  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ posts: json }));
  }
  //handleClick = e => console.log('button clicked for' + e.target);

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <NavigationBar displaytext="Navigation Bar" />

        <div class="jumbotron">
          <h1 class="display-4">Hello World, this is UCSB polls</h1>
        </div>
        <Apoll />
        {/* Add demopoll components here*/}
        <div class="card">
          <div class="card-header">Demo Poll</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">Vote For Your Favorite Dining Commons!</h2>

                </div>
                <DemoPoll />
               
               
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
                <PollResults pollID = "FFcmP1ZAsVc2eYWNNk9Y" />
              </div>
          
        </div>
        </div>
        </div>
        <div class="card">
        <div class="card-header">Create a New Poll</div>
        <NewVote />
        </div>
        
        
        
      </div>
    );
  }
}
export default App; 
