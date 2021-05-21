import React, { Component } from "react";
import Apoll from "../components/homePagePolls.js";



class BrowsePage extends Component {
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
        <div class="jumbotron">
        <h1 class="display-4">Browse Polls</h1>
        </div>
        <Apoll />
      </div>
    );
  }
}
export default BrowsePage; 
