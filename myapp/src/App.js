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
        <div class="card">
          <div class="card-header">
            recent poll
          </div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <img class="card-img-top" src=".../100px180/?text=poll result graph" alt="result"/>
                <div class="card-body">
                  <h5 class="card-title">Pool1</h5>
                  <a href="#" class="btn btn-primary">go to vote</a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img class="card-img-top" src=".../100px180/?text=poll result graph" alt="result"/>
                <div class="card-body">
                  <h5 class="card-title">Pool2</h5>
                  <a href="#" class="btn btn-primary">go to vote</a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img class="card-img-top" src=".../100px180/?text=poll result graph" alt="result"/>
                <div class="card-body">
                  <h5 class="card-title">Pool3</h5>
                  <a href="#" class="btn btn-primary">go to vote</a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img class="card-img-top" src=".../100px180/?text=poll result graph" alt="result"/>
                <div class="card-body">
                  <h5 class="card-title">Pool4</h5>
                  <a href="#" class="btn btn-primary">go to vote</a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img class="card-img-top" src=".../100px180/?text=poll result graph" alt="result"/>
                <div class="card-body">
                  <h5 class="card-title">Pool5</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
              <div class="card">
                <img class="card-img-top" src=".../100px180/?text=poll result graph" alt="result"/>
                <div class="card-body">
                  <h5 class="card-title">Pool6</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary">view all</a>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
