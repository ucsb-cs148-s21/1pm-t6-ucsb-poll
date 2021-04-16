import React, { Component } from 'react';
import NavigationBar from './NavigationBar'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ posts: json }))
  }

  

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <NavigationBar displaytext= "Navigation Bar" />

        <div class="jumbotron">
          <h1 class="display-4">Hello World, this is UCSB polls</h1> 
        </div>
        <div class="card-deck">
          <div class="card">
            <img class="card-img-top" src="poll result graph" alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title">Pool1</h5>
            </div>
            <div class="card-footer">
              <small class="text-muted">?seconds ago</small>
            </div>
          </div>
          <div class="card">
            <img class="card-img-top" src="poll result graph" alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title">Pool1</h5>
            </div>
            <div class="card-footer">
              <small class="text-muted">?seconds ago</small>
            </div>
          </div>
          <div class="card">
            <img class="card-img-top" src="poll result graph" alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title">Pool1</h5>
            </div>
            <div class="card-footer">
              <small class="text-muted">?seconds ago</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
