import React, { useState } from 'react';

import './VoteForm.css';
 
const VoteForm = (props) => {
  const [enteredQuestions, setEnteredQuestions] = useState('');
  const [enteredCategories, setEnteredCategories] = useState('art');
  const [enterDueDate, setEnterDueDate] = useState('');
  const [enterVoteOp1, setEnterVoteOp1] = useState('');
  const [enterVoteOp2, setEnterVoteOp2] = useState('');
  const [enterVoteOp3, setEnterVoteOp3] = useState('');
  const [enterVoteOp4, setEnterVoteOp4] = useState('');
  const [cancelButtonDisplay, setCancelButtonDisplay] = useState(true);

  if (props.cancelButtonDisplay !== cancelButtonDisplay) {
    setCancelButtonDisplay(props.cancelButtonDisplay);
  }

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
    var vote = [];
    vote.push(enterVoteOp1);
    vote.push(enterVoteOp2);
    vote.push(enterVoteOp3);
    vote.push(enterVoteOp4);


    const VoteData = {
      question: enteredQuestions,
      category: enteredCategories,
      answerable: true,
      date: new Date(enterDueDate),
      options: vote,
    };

    props.onSaveVoteData(VoteData);
    setEnteredQuestions('');
    setEnteredCategories('art');
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
          {/* <input
            type='text'   
            value={enteredCategories}
            onChange={CategoriesChangeHandler}
          /> */}
          <select value={enteredCategories} onChange={CategoriesChangeHandler}>
           <option selected value="art">Art and Literature</option>
           <option value="career">Career</option>
           <option value="food">Food and Drink</option>
           <option value="fun">Fun and Games</option>
           <option value="movies">Movies and TV</option>
           <option value="music">Music</option>
           <option value="school">School</option>
           <option value="travel">Travel</option>
           <option value="other">Other</option>
          </select>
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
        {cancelButtonDisplay && <button type="button" onClick={props.onCancel}>Cancel</button>}
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default VoteForm;
