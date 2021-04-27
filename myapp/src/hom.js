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
class HelloMessage extends React.Component {
    render() {
      var list=[];
      /*
      asyncFunction(list);
      console.log(list)
      console.log(list.first())
      
        console.log('I was triggered during render')
        let list=[]
        db.collection("users").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc)  {
              console.log(`${doc.id} => ${doc.data().name}`);
              list.push(`${doc.data().name}`)
              
              console.log(list[0])
              
          });
         
      });
      console.log(list)
      */
     /*
     let p1=[]; 
      var citiesRef = db.collection("users");
      citiesRef.where("role", "==", "admin").get().then(function(p){
        let k=p._delegate._snapshot.docChanges;
        console.log(k);
        console.log(k[0]);
        console.log(k[0].doc.data.partialValue.mapValue.fields)
        
        p1[0]=(k[0].doc.data.partialValue.mapValue.fields.name.stringValue)
        p1[1]=(k[1].doc.data.partialValue.mapValue.fields.name.stringValue)
        p1[2]=(k[2].doc.data.partialValue.mapValue.fields.name.stringValue)
        console.log(p1)
      });
      
      //.then((res) =>{
     //   console.log(res);
   // });

      console.log(p1[0])
      */
     /*
     db.collection("users").where("role", "==", "admin")
     .onSnapshot((querySnapshot) => {
         var cities = [];
         querySnapshot.forEach((doc) => {
             cities.push(doc.data().name);
             list.push(doc.data().name)
         });
         console.log("here", cities.join(", "));
     });
 

     console.log('I was triggered during render')
     db.collection("users").get().then((querySnapshot) => {
       querySnapshot.docs.map(function(doc){
           console.log(`${doc.id} => ${doc.data().name}`);
           list.push(`${doc.data().name}`)
       });
   });
   */
  var poppp=[];
       
  db.collection("polls").orderBy("date").limit(6).onSnapshot("value", function(snapshot) {
      var questions = [];
      snapshot.forEach(function(data) {
          questions.push(data.data().question);
          poppp.push(data.data().question);
      });
      poppp.push(questions);
  });

    console.log(poppp)
    console.log(poppp.length)
    console.log(poppp[0])
    console.log(poppp[2][0])
      return ( 
        <div>
          {list[0]}
        </div>
      );
      
   }
}
export default HelloMessage;
