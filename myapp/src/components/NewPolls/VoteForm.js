import React, { useState } from 'react';

import './VoteForm.css';
 
const VoteForm = (props) => {
  const [enteredQuestions, setEnteredQuestions] = useState('');
  const [enteredCategories, setEnteredCategories] = useState('');
  const [enterDueDate, setEnterDueDate] = useState('');
  const [enterVoteOp1, setEnterVoteOp1] = useState('');
  const [enterVoteOp2, setEnterVoteOp2] = useState('');
  const [enterVoteOp3, setEnterVoteOp3] = useState('');
  const [enterVoteOp4, setEnterVoteOp4] = useState('');

  const QuestionsChangeHandler = (event) => {
    setEnteredQuestions(event.target.value);
  };

  const CategoriesChangeHandler = (event) => {
    setEnteredCategories(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnterDueDate(event.target.value);
  };
  const VoteOp1ChangeHandler = (event) => {
    setEnterVoteOp1(event.target.value);
  };
  const VoteOp2ChangeHandler = (event) => {
    setEnterVoteOp2(event.target.value);
  };
  const VoteOp3ChangeHandler = (event) => {
    setEnterVoteOp3(event.target.value);
  };
  const VoteOp4ChangeHandler = (event) => {
    setEnterVoteOp4(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const VoteData = {
      Questions: enteredQuestions,
      Categories: enteredCategories,
      date: new Date(enterDueDate),
      voteOp1: enterVoteOp1,
      voteOp2: enterVoteOp2,
      voteOp3: enterVoteOp3,
      voteOp4: enterVoteOp4,

    };

    props.onSaveVoteData(VoteData);
    setEnteredQuestions('');
    setEnteredCategories('');
    setEnterDueDate('');
    setEnterVoteOp1('');
    setEnterVoteOp2('');
    setEnterVoteOp3('');
    setEnterVoteOp4('');

  };

  return (
    <form onSubmit={submitHandler}>
      
        <div className='new-title__controls'>
          <label>Question</label>
          <input
            type='text'
            value={enteredQuestions}
            onChange={QuestionsChangeHandler}
          />
        </div>
        <div className='new-title__controls'>
          <label>Category</label>
          <input
            type='text'   
            value={enteredCategories}
            onChange={CategoriesChangeHandler}
          />
        </div>
        <div className='new-title__controls'>
          <label>Due Date</label>
          <input
            type='date'
            min='2021-01-01'
            max='2022-12-31'
            value={enterDueDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className='new-VoteOp__control'>
          <label>Vote option1</label>
          <input
            type='text'
            value={enterVoteOp1}
            onChange={VoteOp1ChangeHandler}
          />
        </div>
        <div className='new-VoteOp__control'>
          <label>Vote option2</label>
          <input
            type='text'
            value={enterVoteOp2}
            onChange={VoteOp2ChangeHandler}
          />
        </div>
        <div className='new-VoteOp__control'>
          <label>Vote option3</label>
          <input
            type='text'
            value={enterVoteOp3}
            onChange={VoteOp3ChangeHandler}
          />
        </div>
        <div className='new-VoteOp__control'>
          <label>Vote option4</label>
          <input
            type='text'
            value={enterVoteOp4}
            onChange={VoteOp4ChangeHandler}
          />
        </div>

      
      <div className='new-action'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default VoteForm;
