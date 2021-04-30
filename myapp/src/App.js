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
          <h1 class="display-4">Welcome to UCSB polls</h1>
        </div>

        {/* Add demopoll components here*/}
        <div class="card">
          <div class="card-header">Recommended Polls</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <PollResults pollID = "FFcmP1ZAsVc2eYWNNk9Y" />
              </div>
              <div class="card">
                <PollResults pollID = "M6qsfGs1daQlI3Luqiib" />
              </div>
              <div class="card">
                <PollResults pollID = "ldWrJjKj7wPudp3ovuWO" />
              </div>

            </div>
          </div>
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
export default App; 
