import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ThemeProvider } from 'react-bootstrap';



<body>
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js">
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
var db = firebase.firestore();
/*
function asyncFunction(list){
  setTimeout(function(){
    db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc)  {
          console.log(`${doc.id} => ${doc.data().name}`);
          list.push(`${doc.data().name}`)  
      });
  });
  });
}
*/
class Poll {
  constructor (answerable, date, question ) {
      this.answerable = answerable;
      this.date = date;
      this.question = question;
  }
}
// Firestore data converter
const pollConverter = {
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

const initialList = [];

function HelloMessage(){
  const [list, setList] = React.useState(initialList);
  db.collection("polls").orderBy("date").limit(6).onSnapshot("value", function(snapshot) {
      snapshot.forEach(function(data) {
        const newList = list.concat(JSON.stringify(data.data()))
        setList(newList);
      });

  });

  return (
    <div>{list}</div>
  );
}
// class HelloMessage extends React.Component {
//     render() {
//       var list=[];
//   var poppp=[];
       
//   db.collection("polls").orderBy("date").limit(6).onSnapshot("value", function(snapshot) {
//       var questions = [];
//       snapshot.forEach(function(data) {
//           questions.push(data.data().question);
//           poppp.push(data.data().question);
//       });
//       poppp.push(questions);
//   });
//     console.log("here")
//     console.log(poppp)
//     console.log(poppp.length)
//     console.log(poppp[0])
//     // console.log(poppp[2][0])
//       return ( 
//         <div>
//           {list[0]}
//         </div>
//       );
      
//    }
// }
export default HelloMessage;
