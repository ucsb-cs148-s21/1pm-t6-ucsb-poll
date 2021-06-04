import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import VoteForm from './VoteForm';
import './NewVote.css';
import { ThemeProvider } from 'react-bootstrap';

const NewVote = (props) => {
  const { isAuthenticated, user } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);

  const saveVoteDataHandler = (enteredVoteData) => {
    const url = "/addNewPoll"
    try {
          const result = fetch(url, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...enteredVoteData,
                  email: user.email
              }),
          });
          console.log(`result=${JSON.stringify(result)}`);  

      } catch (err) {
          console.log(`err=${err}`)
      } 
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
      {(!isEditing && isAuthenticated) && (
        <button onClick={startEditingHandler}>Add Poll Information</button>
      )}
      {(isEditing && isAuthenticated) && (
        <VoteForm
          onSaveVoteData={saveVoteDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewVote;
