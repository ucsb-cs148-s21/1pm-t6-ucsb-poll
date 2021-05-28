import React, { useState } from 'react';

import VoteOptionForm from './VoteOptionForm';
import './NewVoteOption.css';

const NewVoteOption = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveVoteOptionDataHandler = (enteredVoteOptionData) => {
    const VoteOptionData = {
      ...enteredVoteOptionData,
      id: Math.random().toString(),
    };
    props.onAddVoteOption(VoteOptionData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-VoteOption'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New VoteOption</button>
      )}
      {isEditing && (
        <VoteOptionForm
          onSaveVoteOptionData={saveVoteOptionDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewVoteOption;
