import React, { useState } from 'react';

import './VoteOptionForm.css';

const VoteOptionForm = (props) => {
  const [enteredOption, setEnteredOption] = useState('');
  //const [enteredAmount, setEnteredAmount] = useState('');
  //const [enteredDate, setEnteredDate] = useState('');
  // const [userInput, setUserInput] = useState({
  //   enteredOption: '',
  //   enteredAmount: '',
  //   enteredDate: '',
  // });

  const OptionChangeHandler = (event) => {
    setEnteredOption(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredOption: event.target.value,
    // });
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredOption: event.target.value };
    // });
  };



  const submitHandler = (event) => {
    event.preventDefault();

    const VoteOptionData = {
      Option: enteredOption,

    };

    props.onSaveVoteOptionData(VoteOptionData);
    setEnteredOption('');

  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-VoteOption__controls'>
        <div className='new-VoteOption__control'>
          <label>Option</label>
          <input
            type='text'
            value={enteredOption}
            onChange={OptionChangeHandler}
          />
        </div>

      </div>
      <div className='new-VoteOption__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add VoteOption</button>
      </div>
    </form>
  );
};

export default VoteOptionForm;
