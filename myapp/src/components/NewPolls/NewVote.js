import React, { useState } from 'react';

import VoteForm from './VoteForm';
import './NewVote.css';
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


const NewVote = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveVoteDataHandler = (enteredVoteData) => {
    const VoteData = {
      ...enteredVoteData,
      id: Math.random().toString(),
    };
    db.collection("usertest").add(VoteData)
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

   // props.onAddVote(VoteData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-action'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add Poll Information</button>
      )}
      {isEditing && (
        <VoteForm
          onSaveVoteData={saveVoteDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewVote;
