import React, { Component } from "react";
import NewVote from "../components/NewPolls/NewVote";


class CreatePollPage extends Component {
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
        <h1 class="display-4">Create a New Poll</h1>
        </div>

          <NewVote />
      </div>
    );
  }
}
export default CreatePollPage; 
