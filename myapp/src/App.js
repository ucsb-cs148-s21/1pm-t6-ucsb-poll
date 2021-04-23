import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar.js";
import DemoPoll from "./DemoPoll";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyCmZ272B89syKA0FNLa7ujYHvfI60YB2M0",
   	authDomain: "ucsb-polls.firebaseapp.com",
    	projectId: "ucsb-polls",
    	storageBucket: "ucsb-polls.appspot.com",
    	messagingSenderId: "989606767140",
    	appId: "1:989606767140:web:cf485612653f0ba2a186b1",
    	measurementId: "G-0HG55T6LG9"
};

firebase.initializeApp(firebaseConfig);
var database=firebase.database();
database.ref('/').once('value', function(snapshot){
  console.log(snapshot.val());
});

var rootRef = database.ref('/');
rootRef.once('value', function(snapshot){
  console.log(snapshot.val());
});

function polls(){
  var data = document.getElementById("dataValue").value;
  var dataRef = database.ref('/polls');
  dataRef.set({
    value: data
  });
}
var pollsDataRef = database.ref("/polls");
pollsDataRef.on("child_added", function(snapshot){
  console.log("Below is the data from child_added");
  console.log(snapshot.val());
});

database.ref('/polls').once('value', function(snapshot){
  snapshot.forEach(function(data){
    console.log("Below are the child keys of the values in 'polls'")
    console.log(data.key);
  });
  console.log(Object.keys(snapshot.val()));
});

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
        {/* Add demopoll components here*/}
        <div class="card">
          <div class="card-header">Demo Poll</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <DemoPoll />
               
                <div class="card-body">
                  <h2 class="card-title">Vote For Your Favorite Dinning Common!</h2>

                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
          
        </div>
        </div>
        </div>

        <div class="card">
          <div class="card-header">popular polls</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool1</h5>
                  <a href="#" class="btn btn-primary">
                    go to vote
                  </a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool2</h5>
                  <a href="#" class="btn btn-primary">
                    go to vote
                  </a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool3</h5>
                  <a href="#" class="btn btn-primary">
                    go to vote
                  </a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool4</h5>
                  <a href="#" class="btn btn-primary">
                    go to vote
                  </a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool5</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool6</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary">
              view all
            </a>
          </div>
        </div>
        <div class="card">
          <div class="card-header">recent polls</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool1</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool2</h5>
                  <a href="#" class="btn btn-primary">
                    go to vote
                  </a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool3</h5>
                  <a href="#" class="btn btn-primary">
                    go to vote
                  </a>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(open)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool4</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool5</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">Pool6</h5>
                </div>
                <div class="card-footer">
                  <small class="text-muted">?seconds ago(close)</small>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary">
              view all
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
