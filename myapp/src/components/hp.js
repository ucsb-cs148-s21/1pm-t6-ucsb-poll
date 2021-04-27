/*
//import firebase from "firebase";
//import firebase from 'firebase/app'
//import 'firebase/firestore'
import React, { Component } from 'react'
//import "firebase/auth"


<body>
<script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js">
</script>
<script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-auth.js">
</script>
<script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-analytics.js">
</script>
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js">
</script>
</body>

var firebaseConfig = {
    apiKey: "AIzaSyCmZ272B89syKA0FNLa7ujYHvfI60YB2M0",
    authDomain: "ucsb-polls.firebaseapp.com",
    projectId: "ucsb-polls",
    storageBucket: "ucsb-polls.appspot.com",
    messagingSenderId: "989606767140",
    appId: "1:989606767140:web:cf485612653f0ba2a186b1",
    measurementId: "G-0HG55T6LG9"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();
*/
/*
var db = firebase.firestore();

class Poll {
    constructor (answerable, date, question ) {
        this.answerable = answerable;
        this.date = date;
        this.question = question;
    }
}
// Firestore data converter
var pollConverter = {
    toFirestore: function(poll) {
        return {
            answerable: poll.answerable,
            date: poll.date,
            question: poll.question
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Poll(data.answerable, data.date, data.question);
    }
};

class Popup extends Component {
    
    state = {
        poppp: []
    }
    fetchMessages = () => {
        const query = db.collection('polls').orderBy('date').limit(6);
        query.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const messageObj = {}
            messageObj.data = change.doc.data().question
            messageObj.id = change.doc.id
            this.setState({
              ...this.state,
              poppp: [messageObj, ...this.state.poppp]
            })
          })
        })
    }
    
    render(){
        var poppp=[];
       
        db.collection("polls").orderBy("date").limit(6).onSnapshot("value", function(snapshot) {
            var questions = [];
            snapshot.forEach(function(data) {
                questions.push(data.data().question);
               // poppp.push(data.data().question);
            });
            poppp.push(questions);
        });
    
       
        db.collection("polls").orderBy("date").limit(6).onSnapshot((querySnapshot) => {
            let questions = [];
            querySnapshot.forEach((doc) => {
                questions.push(doc.data().question+"");
            });
            poppp.push(questions);
        });
        
        let questions = [];
       // questions.push("nothing")
        //poppp.push(questions);
        
        db.collection("polls").orderBy("date").limit(6).get().then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
                questions.push(doc.data().question+"");
            });
            //questions.push("nothing")
            poppp.push(questions);
        });
        
       
        //questions.push("nothing")
  
        
        var docRef = db.collection("polls");//.doc("");
        var sortbydate=docRef.orderBy("date").limit(6).get();
        poppp.push(sortbydate);
        

   
        return (
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
                  <h5 class="card-title">{poppp[0][0]+""}</h5>
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
        );
    }
}
export default Popup;
*/
