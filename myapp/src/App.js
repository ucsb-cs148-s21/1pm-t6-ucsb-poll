import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar.js";
import DemoPoll from "./components/poll/DemoPoll";
import NewVote from "./components/NewPolls/NewVote";
import Apoll from "./components/homePagePolls.js";
import PollResults from "./components/NewPolls/NewPollResults.js"
import Main from "./Main";



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
    return (
      <div className="App">
        <NavigationBar />
        <Main />
      </div>
    );
  }
}
export default App; 
