import React, { useState } from 'react';

import VoteForm from './VoteForm';
import './NewVote.css';

const NewVote = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveVoteDataHandler = (enteredVoteData) => {
    const VoteData = {
      ...enteredVoteData,
      id: Math.random().toString(),
    };
    props.onAddVote(VoteData);
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
