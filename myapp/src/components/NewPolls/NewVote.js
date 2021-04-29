import React, { useState } from 'react';

import VoteForm from './VoteForm';
import './NewVote.css';
import { ThemeProvider } from 'react-bootstrap';

const NewVote = (props) => {
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
                  ...enteredVoteData
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
