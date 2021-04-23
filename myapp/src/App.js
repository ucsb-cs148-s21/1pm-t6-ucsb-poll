import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar.js";
import DemoPoll from "./DemoPoll";



<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
const db=firebase.database().ref();
<div id='messagesDiv'></div>
db.on('value', function(snapshot) {
	var message = snapshot.val();
	displayMessage(message.answerable, message.date, message.question);
});
function displayMessage(answerable, daye, question) {
    $('#messagesDiv').append('<div>answerable:'+answerable+',date:'+date+',question:'+question+'</div>');
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
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
