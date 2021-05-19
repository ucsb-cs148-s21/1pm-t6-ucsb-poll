import React, { Component } from "react";
import AuthenticationButton from "./login/AuthenticationButton";


class PublicPage extends Component {
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
        <div class="jumbotron">
        <h1 class="display-4">Welcome to UCSB polls</h1>
        </div>     
        <AuthenticationButton />

      </div>
    );
  }
}
export default PublicPage; 
