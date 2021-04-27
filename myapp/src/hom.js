import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



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

class HelloMessage extends React.Component {
    
    render() {
        var citiesRef = db.collection("users");
        var query = citiesRef.where("role", "==", "admin");
        console.log('I was triggered during render')
        console.log(query)
      return ( 
        <div>
          Hello {this.props.name}
        </div>
      );
    }
}
export default HelloMessage;