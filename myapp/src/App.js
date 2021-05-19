import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar.js";
import Main from "./Main";
import { useAuth0 } from "@auth0/auth0-react";



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

    if (1 == 1){
      return (
        <div className="App">
          <NavigationBar />
          <Main />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <NavigationBar />
          <Main />
        </div>
      );
    }
  }
}
export default App; 
